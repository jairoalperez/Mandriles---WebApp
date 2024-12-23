import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mandril } from '../types/mandril';

const MandrilEntries: React.FC = () => {
    const [mandrils, setMandrils] = useState<Mandril[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMandrils = async () => {
            try {
                const response = await axios.get('https://localhost:7095/mandril/all');
                setMandrils(response.data);
            } catch (err) {
                setError('Failed to fetch mandrils.');
            } finally {
                setLoading(false);
            }
        };
        fetchMandrils();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <h1 className="title">Mandriles</h1>
            <ul className="list">
                {mandrils.map((mandril) => (
                    <li key={mandril.id} className="item">
                        <h2 className="item-title">{mandril.firstName} {mandril.lastName}</h2>
                        <p className="item-text">{mandril.skills.length} skills</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MandrilEntries;
