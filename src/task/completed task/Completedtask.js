import { Done, Edit } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../share/loader/Loading';
import { useForm } from 'react-hook-form';

const Completedtask = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const { data: completedtask, isLoading, refetch } = useQuery({
        queryKey: ['completedtask'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://task-app-server-xi.vercel.app/completedtask/${user?.email}`);
                const data = await res.json()
                return data
            }
            finally {

            }
        }
    })
    const handleDeletetask = task => {
        fetch(`https://task-app-server-xi.vercel.app/completedtask/${task._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount > 0) {
                    toast.success(`${task.task} deleted from your task`)
                    refetch()
                }

            })
    }
    const handleKeypress = e => {
        if (e.key === "Enter") {
            handleSubmit();
            console.log(e.target.value)
            e.preventDefault()
            e.target.value = '';
            toast.success('comment done')

        }
    };
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <p className='mt-8 mb-4 font-sans text-2xl text-center lg:mt-10'>Completed task</p>
            {
                completedtask.map((task, i) => <div key={i + 1} className='mb-10 text-center'>
                    <p className='mb-2 text-blue-500'>Task name : {task.task}</p>
                    <div className='flex justify-center'>
                        <Button onClick={() => handleDeletetask(task)} color="error" size="small" variant="outlined" sx={{ mr: '1ch' }} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Link to='/mytask'><Button startIcon={<Done></Done>} variant='outlined' size="small" color="success">Not Complete</Button></Link>

                    </div>
                    <TextField
                        onKeyDown={handleKeypress}
                        id="filled-textarea"
                        label="Comment for this task"
                        placeholder="Comment here"
                        multiline
                        variant="filled"
                    />
                </div>)
            }

        </div>
    );
};

export default Completedtask;