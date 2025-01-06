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
import { Select } from "@radix-ui/react-select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { EPower } from "@components/types/power";
import { useParams } from "next/navigation";

interface EditMandrilModalProps {
    isOpen: boolean;
    onClose: () => void;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
}

const EditMandrilModal: React.FC<EditMandrilModalProps> = ({
    isOpen,
    onClose,
    firstNamePlaceholder,
    lastNamePlaceholder
}) => {
    const params = useParams(); // Get the params object from useParams
    const id = params?.id; // Access the id parameter from the params object

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [firstName, setFirstName] = useState<string>(firstNamePlaceholder);
    const [lastName, setLastName] = useState<string>(lastNamePlaceholder);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            FirstName: firstName,
            LastName: lastName,
        };

        try {
            const response = await axios.put(
                `https://localhost:7095/mandril/${id}`,
                payload
            );
            console.log("Mandril edited:", response.data);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Error editing mandril:", error);
            setIsErrorModalOpen(true);
        }
    };

    if (!isOpen || !firstNamePlaceholder || !lastNamePlaceholder) return null;

    return (
        <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Card className="bg-background p-6 rounded-lg shadow-lg border-border border shadow">
                <CardHeader>
                    <CardTitle className="text-xl mb-4 text-foreground text-center">
                        Edit Mandril
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />
                        <Input
                            type="text"
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
                            Confirm
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
        </div>
    );
};

export default EditMandrilModal;
