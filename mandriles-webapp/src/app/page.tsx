import React, { useEffect, useState } from "react";
import MandrilCard from "../components/MandrilCard";
import { cn } from "@components/lib/utils";
import MandrilList from "@components/components/MandrilList";

const Home: React.FC = () => {
	return (
      <div className="min-h-screen bg-background">
        <MandrilList />
      </div>
  );
};

export default Home;
