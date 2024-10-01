import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence, motion } from "framer-motion";

import axios from '../instances/config'
import InputBox from '../components/common/InputBox';
import { login } from '../slices/userSlice';
const Login = () => {

  const { user } = useSelector((state)=> state.user)

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (!password || !email) {
                toast.error("All fields are required")
            } 

            const res = await axios.post('/users/login', {
              password, email
            });
            setLoading(false);
            toast.success(res.data.message);

            dispatch(login(res.data))

         
            navigate('/');


           

        } catch (error) {
            setLoading(false);

            toast.error(error.response.data.message);

        }


    }

    useEffect(() => {
      if(user){
        navigate('/');
      }
    }, [user])
    
    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Toaster />

            <div className='flex justify-center items-center h-[100vh] '>
                <form className='w-[80%] max-w-[400px]   flex flex-col justify-center items-center border-[1px] border-gray-700 py-8' onSubmit={handleSubmit}>

                    <h1 className='text-xl capitalize text-center mb-8 text-white'>
                        Welcome Back</h1>

                    <div className=''>
                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>





                    <button className='bg-gray-800 bg-opacity-50 backdrop-blur-md border border-gray-700 px-6 py-2 rounded-md'
                        type='submit'
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>

                <Link to={'/register'} className='text-gray-400 my-2'>Don't have an account</Link>

                </form>


            </div>
        </div>

    )
}

export default Login