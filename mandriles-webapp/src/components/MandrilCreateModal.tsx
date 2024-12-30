import React, { useState } from 'react';
import axios from 'axios';

interface MandrilCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MandrilCreateModal: React.FC<MandrilCreateModalProps> = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            FirstName: firstName,
            LastName: lastName
        };

        try {
            const response = await axios.post('https://localhost:7095/mandril', payload);
            console.log('Mandril created:', response.data);
            onClose(); // Close modal after creating
        } catch (error) {
            console.error('Error creating mandril:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">Create New Mandril</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
                </form>
                <button onClick={onClose} className="mt-2 text-red-500">Close</button>
            </div>
        </div>
    );
};

export default MandrilCreateModal;