"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@components/lib/utils";
import { Mandril } from "@components/types/mandril";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/components/ui/table";
import { Skill } from "@components/types/skill";
import { EPower } from "@components/types/power";
import { Button } from "@components/components/ui/button";
import SkillCreateModal from "@components/components/SkillCreateModal";

const MandrilDetail: React.FC = () => {
    const params = useParams(); // Get the params object from useParams
    const id = params?.id; // Access the id parameter from the params object

    const [mandril, setMandril] = React.useState<Mandril | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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
    }, [id, isModalOpen]);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const handleDelete = async (skillId: number) => {
        try {
            await axios.delete(`https://localhost:7095/mandril/${id}/skill/${skillId}`)
            .then((response) => {
                console.log("Mandril deleted: ", response.data);
                if (mandril) {
                    setMandril({
                        ...mandril,
                        skills: mandril.skills.filter((skill) => skill.id !== skillId)
                    });
                }
            })
        }
        catch (error) {
            console.error("Error deleting mandril: ", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div
                className={cn("flex flex-col items-center ml-8 mr-8 mt-8 p-4")}
            >
                <h1 className="text-3xl md:text-4xl whitespace-nowrap font-bold mb-8 mt-8 text-foreground">
                    {mandril?.firstName} {mandril?.lastName}
                </h1>

                <div className="flex justify-center w-full">
                    <div>
                        <Table className="w-auto mx-auto">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold w-16">
                                        ID
                                    </TableHead>
                                    <TableHead className="font-bold w-48">
                                        Skill
                                    </TableHead>
                                    <TableHead className="font-bold w-48">
                                        Power
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mandril?.skills.map((skill) => (
                                    <TableRow key={skill.id}>
                                        <TableCell className="text-foreground font-bold">
                                            {skill.id}
                                        </TableCell>
                                        <TableCell className="text-foreground">
                                            {skill.name}
                                        </TableCell>
                                        <TableCell className="text-foreground">
                                            {EPower[skill.power]}
                                        </TableCell>
                                        <TableCell className="text-foreground">
                                            <Button 
                                            className="text-foreground bg-red-500 bg-opacity-50 font-bold hover:bg-red-500 hover:bg-opacity-100"
                                            onClick={() => handleDelete(skill.id)}>
                                                X
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-between items-center mt-8 w-full mx-auto">
                            <Button
                                className="w-32 text-foreground bg-yellow-500 bg-opacity-50 font-bold hover:bg-yellow-500 hover:bg-opacity-100"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Add Skill
                            </Button>
                            <Button className="w-32 text-foreground bg-red-500 bg-opacity-50 font-bold hover:bg-red-500 hover:bg-opacity-100">
                                Delete Mandril
                            </Button>
                        </div>
                    </div>
                </div>
                <SkillCreateModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default MandrilDetail;
