import React from 'react';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const {user} = useAuth();
    return (
        <div className='flex justify-center items-center py-16'>
            <h1 className='bg-white px-12 py-6 rounded-xl shadow-xl'>This is Simple Dashboard for <b>{user.username}</b></h1>
        </div>
    );
};

export default Dashboard;