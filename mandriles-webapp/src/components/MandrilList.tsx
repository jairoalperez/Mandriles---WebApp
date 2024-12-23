"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Mandril } from "../types/mandril"

const MandrilList: React.FC = () => {
	const [mandrils, setMandrils] = useState<Mandril[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let config = {
			method: "get",
			url: "https://localhost:7095/mandril/all",
		}

		axios
			.request(config)
			.then((response) => {
				setMandrils(response.data)
				setLoading(false)
			})
			.catch((error) => {
				setError(`Error fetching data ${error}`)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		console.log("estoy aqui")
		return <div>{error}</div>
	}

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">MANDRILES</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{mandrils.map((mandril) => (
					<div key={mandril.id} className="border p-4 rounded-lg shadow-md bg-white">
						<h2 className="text-xl font-semibold">
							{mandril.firstName} {mandril.lastName}
						</h2>
						<ul className="mt-2">
							{mandril.skills.map((skill) => (
								<li key={skill.id} className="text-sm text-grey-700">
									{skill.name} - (Power: {skill.power})
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}

export default MandrilList
