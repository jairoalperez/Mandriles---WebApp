"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mandril } from "../types/mandril";
import { cn } from "@components/lib/utils";
import MandrilCard from "./MandrilCard";
import Link from "next/link";
import MandrilCreateCard from "./MandrilCreateCard";
import MandrilCreateModal from "./MandrilCreateModal"; // Import the modal component

const MandrilList: React.FC = () => {
    const [mandrils, setMandrils] = useState<Mandril[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let config = {
            method: "get",
            url: "https://localhost:7095/mandril/all",
        };

        axios
            .request(config)
            .then((response) => {
                setMandrils(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(`Error fetching data ${error}`);
                setLoading(false);
            });
    }, [isModalOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };

        // Set initial state
        setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        // Clean up the event listener on component unmount
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    if (loading) {
        return <div className="text-foreground">Loading...</div>;
    }

    if (error) {
        return <div className="text-foreground">{error}</div>;
    }

    return (
        <div className="flex justify-center">
            <div className={cn("mx-auto flex flex-col items-center p-4")}>
                <h1 className="text-4xl font-bold mx-auto mb-8 mt-8 text-foreground">
                    MANDRILES
                </h1>
                <div
                    className={cn(
                        "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4"
                    )}
                >
                    <MandrilCreateCard onClick={() => setIsModalOpen(true)} />
                    <MandrilCreateModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                    {mandrils.map((mandril) => (
                        <Link key={mandril.id} href={`/mandril/${mandril.id}`}>
                            <MandrilCard mandril={mandril} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MandrilList;
