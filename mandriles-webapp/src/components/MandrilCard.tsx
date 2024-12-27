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
import Link from "next/link";

interface MandrilCardProps {
  mandril: Mandril;
}

const MandrilCard: React.FC<MandrilCardProps> = ({ mandril }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      console.log("Dark mode:", e.matches);
    };

    setIsDarkMode(mediaQuery.matches);
    console.log("Initial dark mode:", mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Link href={`/mandril/${mandril.id}`}>
      <div className={isDarkMode ? "dark" : "light"}>
        <Card
          className={cn(
            "w-[280px] text-center transition-colors duration-200 cursor-pointer bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground border-border active:bg-foreground active:text-background"
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
    </Link>
  );
};

export default MandrilCard;
