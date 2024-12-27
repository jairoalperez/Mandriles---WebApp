"use client";

import React, { useEffect, useState } from "react";
import MandrilCard from "../components/MandrilCard";
import { cn } from "@components/lib/utils";
import MandrilList from "@components/components/MandrilList";

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <body
      className={cn(
        "bg-background min-h-screen",
        isDarkMode ? "dark" : "light"
      )}
    >
      <div>
        <MandrilList />
      </div>
    </body>
  );
};

export default Home;
