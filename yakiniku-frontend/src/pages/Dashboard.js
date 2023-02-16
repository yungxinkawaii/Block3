import React, { useState, useEffect } from 'react'
import Card from '../components/ForumCard'
import { useNavigate } from 'react-router-dom'

import { useForumContext } from '../context/forum'

const Dashboard = () => {
	const { getAllForums } = useForumContext()
	const [forums, setForums] = useState([])

	useEffect(() => {
		async function fetchData() {
			const forums = await getAllForums()
			setForums(forums)
		}

		fetchData()
	}, [getAllForums])

	const navigate = useNavigate()

	const handleNavigate = (forum) => {
		navigate(`/forum/${forum.id}`, { state: forum })
	}

	return (
		<div className="dashboard">
			{forums.map((forum) => (
				<Card
					key={forum.id}
					title={forum.title}
					description={forum.description}
					image={forum.image}
					onClick={() => handleNavigate(forum)}
				/>
			))}
		</div>
	)
}

export default Dashboard
