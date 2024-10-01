const mongoose = require('mongoose')


let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        required:[true,"Please add a email"],
        unique:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "password is required"],
      },
    photo:{
        type:String,
        required:[true,"Please enter a photo"],
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        } 
    },
    phone:{
        type:String,

    },
    bio:{
        type:String,
        maxLength:[250,"Bio must not be more than 250 characters"],
        default:"bio"
    }
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema);
module.exports = User;