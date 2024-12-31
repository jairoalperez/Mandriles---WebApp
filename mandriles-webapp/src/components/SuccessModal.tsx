import React, { useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import MandrilCreateModal from "./MandrilCreateModal";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
}) => {
    const handleSubmit = async () => {
        console.log("Mandril Created Successfully!");
        window.location.reload(); // Refresh the page to update the dashboard
        onClose(); // Close modal after creating
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-background p-6 rounded-lg shadow-lg border-border border shadow">
                <CardHeader>
                    <CardTitle className="text-xl mb-4 text-foreground text-center">
                        Mandril Created Successfully!
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center justify-center">
                <Button onClick={handleSubmit} className="bg-yellow-500 bg-opacity-50 font-bold text-foreground hover:text-background">Done</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuccessModal;
