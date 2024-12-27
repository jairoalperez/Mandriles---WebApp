"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import React, { useEffect, useState } from "react"
import { Mandril } from "../types/mandril"
import { cn } from "@components/lib/utils"
import Link from "next/link"

interface MandrilCardProps {
	mandril: Mandril
}

const MandrilCard: React.FC<MandrilCardProps> = ({ mandril }) => {
	return (
		<Link href={`/mandril/${mandril.id}`}>
			<Card
				className={cn(
					"w-[280px] text-center transition-colors duration-200 cursor-pointer bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground border-border active:bg-foreground active:text-background"
				)}
			>
				<CardHeader>
					<CardTitle className="text-2xl">
						{mandril.firstName} {mandril.lastName}
					</CardTitle>
					<CardDescription className="text-lg">{mandril.skills.length} Skills</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	)
}

export default MandrilCard
