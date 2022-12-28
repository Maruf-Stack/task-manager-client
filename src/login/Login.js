import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Input } from 'postcss';
import { Box } from '@mui/system';
import './login.css'

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext)
    const { google } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const location = useLocation()
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const handleLogin = data => {
        console.log(data)
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setUserEmail(data.email)
                toast.success('Log in success')

            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }
    const googleLogin = () => {
        google(googleProvider)
            .then(result => {
                const name = result.user.displayName;
                const email = result.user.email;
                const role = "user";
                const user = {
                    name, email, role
                }
                console.log(user)
                saveUserInfo(user)
                toast.success("Successfully log in")
                navigate('/')
            })
            .catch(error => {
                console.error(error)
                toast.error("Failed")
            })
    }
    const saveUserInfo = (user) => {
        const email = user.email

        fetch('https://resale-server-nine.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setUserEmail(email)
            })
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='h-[400px] flex justify-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-semibold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="w-full max-w-xs form-control">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: '2ch' }}>
                            <TextField className='inputfield' sx={{ width: '35ch' }} id="standard-basic" type='email' label="Email" variant="standard" {...register("email", {
                                required: 'Enter your email'
                            })} />
                            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                        </Box>


                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ width: '35ch', mt: '2ch' }} variant="outlined">
                                <InputLabel id="standard-basic">Password</InputLabel>
                                <OutlinedInput
                                    id="standard-basic"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be 6 characters long" },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                    })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                {errors.password && <p className='text-sm text-red-600'>{errors.password?.message}</p>}
                            </FormControl>
                        </Box>


                    </div>
                    <Button variant="outlined" sx={{ mt: '2ch', mb: '2ch' }}><input value="login" type="submit" /></Button>
                    <div>
                        {loginError && <p className='text-red-600'>Email or password was wrong</p>}
                    </div>
                    <Link className="text-sm forget" href="#" underline="hover">Forget Password?</Link>
                    <p className='text-sm'>New to task manager? <Link className='text-sky-500' to="/signup">Create new Account</Link></p>
                    <div className="text-sm text-center">OR</div>
                    <Button sx={{ m: 1, width: '35ch' }} variant="outlined" className='w-full btn btn-outline btn-primary' onClick={googleLogin}><GoogleIcon sx={{ mr: '1ch' }}></GoogleIcon>CONTINUE WITH GOOGLE</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;