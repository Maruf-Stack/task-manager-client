import React from 'react';
import TextField from '@mui/material/TextField';
import './home.css'

const Home = () => {

    // const handleSubmit = e => {

    // };
    // const handleKeypress = e => {
    //     if (e.key === "Enter") {
    //         handleSubmit();
    //         console.log(e.target.value)
    //         e.preventDefault()
    //         e.target.value = '';

    //     }
    // };
    return (
        <div>
            <div className='mt-10 text-center'>
                {/* <form>
                    <TextField multiline label="New task" type='text' onKeyDown={handleKeypress} name='newtask'></TextField>
                </form> */}
                <p className='text-2xl lg:text-3xl welcome'>Welcome to Task Manager</p>

            </div>
        </div>
    );
};

export default Home;