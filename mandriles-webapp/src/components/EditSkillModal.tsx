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

interface SkillCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    namePlaceholder: string;
    powerPlaceholder: string;
    skillId: number;
}

const SkillCreateModal: React.FC<SkillCreateModalProps> = ({
    isOpen,
    onClose,
    namePlaceholder,
    powerPlaceholder,
    skillId
}) => {
    const params = useParams(); // Get the params object from useParams
    const id = params?.id; // Access the id parameter from the params object

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [power, setPower] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            Name: name,
            Power: power,
        };
        //console.log(payload);

        try {
            const response = await axios.put(
                `https://localhost:7095/mandril/${id}/skill/${skillId}`,
                payload
            );
            console.log("Skill edited:", response.data);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Error editing skill:", error);
            setIsErrorModalOpen(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-background p-6 rounded-lg shadow-lg border-border border shadow">
                <CardHeader>
                    <CardTitle className="text-xl mb-4 text-foreground text-center">
                        Edit Skill
                    </CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <Input
                            type="text"
                            placeholder={namePlaceholder}
                            defaultValue={namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="p-2 mb-4 w-full"
                        />
                        <Select value={power} onValueChange={setPower}>
                            <SelectTrigger>
                                <SelectValue placeholder={powerPlaceholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(EPower).map(([key, value]) => {
                                    if (isNaN(Number(key))) {
                                        return (
                                            <SelectItem
                                                key={key}
                                                value={String(value)}
                                            >
                                                {key}
                                            </SelectItem>
                                        );
                                    }
                                })}
                            </SelectContent>
                        </Select>
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
    );
};

export default SkillCreateModal;
