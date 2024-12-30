"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { cn } from '@components/lib/utils';
import { Mandril } from '@components/types/mandril';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/components/ui/table';
import { Skill} from '@components/types/skill';
import { EPower } from '@components/types/power';

const MandrilDetail: React.FC = () => {
    const params = useParams(); // Get the params object from useParams
    const id = params?.id; // Access the id parameter from the params object

    const [mandril, setMandril] = React.useState<Mandril | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (id) {
            let config = {
                method: "get",
                url: `https://localhost:7095/mandril/${id}`,
            };

            axios
                .request(config)
                .then((response) => {
                    setMandril(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(`Error fetching data ${error}`);
                    setLoading(false);
                });
        }
    }, [id]);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className={cn("flex flex-col items-center ml-8 mr-8 mt-8 p-4")}>
                <h1 className="text-3xl md:text-4xl whitespace-nowrap font-bold mb-8 mt-8 text-foreground">{mandril?.firstName} {mandril?.lastName}</h1>
                <div className='flex justify-center w-full'>
                <Table className='w-auto mx-auto'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='font-bold w-16'>ID</TableHead>
                            <TableHead className='font-bold w-48'>Skill</TableHead>
                            <TableHead className='font-bold w-48'>Power</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mandril?.skills.map((skill) => (
                            <TableRow key={skill.id}>
                                <TableCell className="text-foreground font-bold">{skill.id}</TableCell>
                                <TableCell className="text-foreground">{skill.name}</TableCell>
                                <TableCell className="text-foreground">{EPower[skill.power]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </div>
        </div>
    );
};

export default MandrilDetail;