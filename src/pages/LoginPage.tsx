import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">
                    Our Wedding
                </h1>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
