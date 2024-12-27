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
import axios from "axios";
import { Mandril } from "../types/mandril";
import { cn } from "@components/lib/utils";

interface MandrilCardProps {
  mandril: Mandril;
}

const MandrilCard: React.FC<MandrilCardProps> = ({ mandril }) => {
    return (
    <div>
      <Card
        className={cn(
          "w-[280px] text-center transition-colors duration-200 cursor-pointer bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground border-border"
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl">
            {mandril.firstName} {mandril.lastName}
          </CardTitle>
          <CardDescription className="text-lg">
            {mandril.skills.length} Skills
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default MandrilCard;
