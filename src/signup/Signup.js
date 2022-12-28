import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import './signup.css'

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser } = useContext(AuthContext)
    const [signUpError, setSignUPError] = useState('')
    const navigate = useNavigate();
    const [createdEmail, setCreatedEmail] = useState('')

    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const userInfo = {
                    displayName: data.name
                }
                reset()
                navigate('/')
                toast.success('User Created Successfully')
                // updateUser(userInfo)
                //     .then(() => {
                //         saveBuyerInfo(data.name, data.email, data.role, data.password)
                //     })
                //     .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className='h-[400px] flex justify-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-semibold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)} className='mt-10'>
                    <div className="w-full max-w-xs form-control">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: '2ch' }}>
                            <TextField sx={{ width: '35ch' }} id="standard-basic" type='text' label="Name" variant="standard" {...register("name", {
                                required: "Name is Required"
                            })} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </Box>
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: '2ch' }}>
                            <TextField className='inputfield' sx={{ width: '35ch' }} id="standard-basic" type='email' label="Email" variant="standard" {...register("email", {
                                required: true
                            })} />
                            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                        </Box>
                    </div>
                    <div className="w-full max-w-xs form-control">
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
                            </FormControl>
                        </Box>
                        <Button variant="outlined" sx={{ mt: '2ch' }}><input value="Sign Up" type="submit" /></Button>
                        {signUpError && <p className='text-sm text-red-600'>{signUpError}</p>}
                        <p className='mt-3 text-sm lg:text-md'>Already have an account?<Link className='text-sky-500' to="/login">Please Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Signup;