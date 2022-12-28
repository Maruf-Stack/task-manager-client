import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
const Addtask = () => {
    const { register, handleSubmit } = useForm();
    const handleMytask = data => {
        const task = data?.addtask;
        console.log(task)
    }
    return (
        <div>
            <p>Add task</p>
            <div>
                <form onSubmit={handleSubmit(handleMytask)} className='mx-5 mt-5 lg:mx-96 lg:mt-20'>
                    <div className='mb-5'>
                        <TextField multiline id="standard-basic" label="New task" variant="standard" type='text' {...register("addtask", {
                            required: "task is Required"
                        })} />
                    </div>
                    <div className='mb-5'>
                        <Button variant="contained" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" {...register("img", {
                                required: "Name is Required"
                            })} />
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