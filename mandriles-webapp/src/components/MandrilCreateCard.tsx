"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import React, { useEffect, useState } from "react";
import { cn } from "@components/lib/utils";

interface MandrilCreateCardProps {
  onClick?: () => void;
}

const MandrilCreateCard: React.FC<MandrilCreateCardProps> = ({ onClick }) => {
  return (
    <div className="w-[280px]">
      <Card
        className={cn(
          "text-center transition-colors duration-200 cursor-pointer bg-yellow-500 bg-opacity-25 text-card-foreground text-opacity-100 hover:bg-primary hover:text-primary-foreground border-border active:bg-muted active:bg-foreground active:text-background"
        )}
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="text-2xl">
            Create Mandril
          </CardTitle>
          <CardDescription className="text-lg">
            Press Here
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MandrilCreateCard;
