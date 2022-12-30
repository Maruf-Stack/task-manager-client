import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Addtask = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const handleMytask = data => {
        const task = data?.addtask;
        const taskImg = data?.img[0];
        const email = user?.email;
        const myTask = {
            task,
            taskImg,
            email

        }
        fetch('https://task-app-server-xi.vercel.app/mytask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(myTask)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/mytask')
                toast.success('Task added')

            })
            .catch(error => console.error(error))
    }


    const handleKeypress = e => {
        if (e.key === "Enter") {
            handleSubmit();
            console.log(e.target.value)
            e.preventDefault()
            e.target.value = '';

        }
    };

    return (
        <div>
            <p>Add task</p>
            <div>
                <form onSubmit={handleSubmit(handleMytask)} className='mx-5 mt-5 lg:mx-96 lg:mt-20'>
                    <div className='mb-5'>
                        <TextField onKeyDown={handleKeypress} multiline id="standard-basic" label="New task" variant="standard" type='text' {...register("addtask", {
                            required: "task is Required"
                        })} />
                    </div>
                    <div className='mb-5'>
                        <Button variant="contained" component="label">
                            Upload
                            <input type="file" {...register("img", {
                                required: "Name is Required"
                            })} />
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <PhotoCamera />
                        </IconButton>
                    </div>
                    <Button variant="outlined" type='submit'>Submit</Button>
                </form>

            </div>
        </div>
    );
};

export default Addtask;