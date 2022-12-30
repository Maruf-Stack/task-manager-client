import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../share/loader/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import { Done, Edit } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Mytask = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: mytask, isLoading, refetch } = useQuery({
        queryKey: ['mytask'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://task-app-server-xi.vercel.app/mytask/${user?.email}`);
                const data = await res.json()
                return data
            }
            finally {

            }
        }
    })
    const handleDeletetask = task => {
        fetch(`https://task-app-server-xi.vercel.app/mytask/${task._id}`, {
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
    const handleCompletetask = task => {
        fetch('https://task-app-server-xi.vercel.app/completedtask', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Completed task')
                navigate('/completedtask')
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-8 lg:mt-14'>
            <p className='mb-4 font-sans text-2xl text-center'>My task</p>
            {
                mytask.map((task, i) => <div key={i + 1} className='mb-8 text-center'>
                    <p className='mb-2 text-blue-500'>Task name : {task.task}</p>
                    <div className='flex justify-center'>
                        <Button onClick={() => handleDeletetask(task)} color="error" size="small" variant="outlined" sx={{ mr: '1ch' }} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Button size="small" variant='outlined' startIcon={<Edit></Edit>} sx={{ mr: '1ch' }}>Update</Button>
                        <Button onClick={() => { handleCompletetask(task); handleDeletetask(task) }} startIcon={<Done></Done>} variant='outlined' size="small" color="success">Complete</Button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Mytask;