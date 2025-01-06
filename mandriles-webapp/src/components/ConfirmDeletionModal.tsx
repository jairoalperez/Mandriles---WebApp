import Ract, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface ConfirmDeletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeletionModal: React.FC<ConfirmDeletionModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    const handleSubmit = async () => {
        console.log("Proceeded!");
        onConfirm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Card className="bg-background p-6 rounded-lg shadow-lg border-border border shadow">
                <CardHeader>
                    <CardTitle className="text-xl mb-4 text-foreground text-center">
                        You want to delete this mandril?
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center justify-center"></CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="bg-red-500 bg-opacity-50 font-bold hover:bg-red-500 hover:bg-opacity-100 hover:text-background"
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-yellow-500 bg-opacity-50 font-bold text-foreground hover:text-background"
                    >
                        Yes
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ConfirmDeletionModal;
