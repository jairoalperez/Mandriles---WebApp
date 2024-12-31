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
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface MandrilCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MandrilCreateModal: React.FC<MandrilCreateModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            FirstName: firstName,
            LastName: lastName,
        };

        try {
            const response = await axios.post(
                "https://localhost:7095/mandril",
                payload
            );
            console.log("Mandril created:", response.data);
            setIsSuccessModalOpen(true)
        } catch (error) {
            console.error("Error creating mandril:", error);
            setIsErrorModalOpen(true)
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-background p-6 rounded-lg shadow-lg border-border border shadow">
                <CardHeader>
                    <CardTitle className="text-xl mb-4 text-foreground text-center">
                        Create New Mandril
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <Input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="bg-red-500 bg-opacity-50 font-bold hover:bg-red-500 hover:bg-opacity-100 hover:text-background"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            className="bg-yellow-500 bg-opacity-50 font-bold text-foreground hover:text-background"
                        >
                            Create
                        </Button>
                        <SuccessModal
                            isOpen={isSuccessModalOpen}
                            onClose={() => {
                                setIsSuccessModalOpen(false);
                                onClose();
                            }}
                        />
                        <ErrorModal
                            isOpen={isErrorModalOpen}
                            onClose={() => {
                                setIsErrorModalOpen(false);
                                onClose();
                            }}
                        />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default MandrilCreateModal;
