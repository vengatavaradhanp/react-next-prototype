"use client";
import React from 'react';
import { usePostMutation } from '../../../../src/store/apiSlice';
import { useRouter } from 'next/navigation';

interface ItemDetails {
    year: string;
    price: number;
    cpuModel: string;
    hardDiskSize: string;
}

interface Item {
    name: string;
    data: ItemDetails;
}

const SignInPage = () => {
    const [post, { isLoading }] = usePostMutation();
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const payload: Item = {
                "name": "Apple MacBook Pro 16",
                "data": {
                    "year": "2019",
                    "price": 1849.99,
                    "cpuModel": "Intel Core i9",
                    "hardDiskSize": "1 TB"
                }
            }
            const result = await post({ url: '/objects', body: payload }).unwrap();
            // Set token cookie to SAMPLE_TOKEN
            document.cookie = `token=SAMPLE_TOKEN; path=/`;
            console.log('Item created:', result);
            alert('Sign-in successful! Check the console for the created item.');
            router.push('/dashboard');
        } catch (error) {
            console.error('Sign-in failed:', error);
            alert('Sign-in failed. Check the console for details.');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={handleSignIn} disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In and Create Item'}
            </button>
        </div>
    );
};

export default SignInPage;