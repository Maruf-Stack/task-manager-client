import { Done, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '../../share/loader/Loading';

const Completedtask = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { data: completedtask, isLoading, refetch } = useQuery({
        queryKey: ['completedtask'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/mytask/${user?.email}`);
                const data = await res.json()
                return data
            }
            finally {

            }
        }
    })
    const handleDeletetask = task => {
        fetch(`http://localhost:5000/mytask/${task._id}`, {
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
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <p className='mb-4 font-sans text-2xl text-center'>Completed task</p>
            {
                completedtask.map((task, i) => <div key={i + 1} className='mb-8 text-center'>
                    <p className='mb-2 text-blue-500'>Task name : {task.task}</p>
                    <div className='flex justify-center'>
                        <Button onClick={() => handleDeletetask(task)} color="error" size="small" variant="outlined" sx={{ mr: '1ch' }} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Link to='/mytask'><Button startIcon={<Done></Done>} variant='outlined' size="small" color="success">Not Complete</Button></Link>
                    </div>
                </div>)
            }

        </div>
    );
};

export default Completedtask;