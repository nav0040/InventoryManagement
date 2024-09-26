const { generateToken } = require("../helpers/token");
const User = require("../models/User");


exports.registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
        } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }


        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                message:
                    "This email address already exists,try with a different email address",
            });
        }

        const cryptedPassword = await bcrypt.hash(password, 12);

        const user = await new User({

            email,
            password: cryptedPassword,
            name,
            phone

        }).save();

        const token = generateToken({ id: user._id.toString() }, "7d");

        res.send({
            id: user._id,
            name: user.name,
            photo: user.photo,
            token: token,
            email: user.email,
            phone: user.phone,
            message: "Register Success !",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message:
                    "the email address you entered is not connected to an account.",
            });
        }

        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            return res.status(400).json({
                message: "Invalid credentials.Please try again.",
            });
        }

        const token = generateToken({ id: user._id.toString() }, "7d");
        res.send({
            id: user._id,
            name: user.name,
            photo: user.photo,
            token: token,
            email: user.email,
            phone: user.phone,
            message: "Login  Success !",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}