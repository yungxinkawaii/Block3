import React, { useState } from 'react'
import { useProfileContext } from '../context/profile'
import { ConnectWallet } from '@thirdweb-dev/react'

const UpdateProfile = () => {
	const [form, setForm] = useState({
		name: '',
		bio: '',
		image: '',
	})

	const { updateProfile, connect } = useProfileContext()

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!connect) return
		if (!form.name || !form.bio || !form.image) return

		updateProfile(form)
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	return (
		<div>
			<div className="connect">
				<ConnectWallet />
			</div>
			<h1>Update Profile</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={form.name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="bio">Bio:</label>
					<input
						type="text"
						id="bio"
						name="bio"
						value={form.bio}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="image">Image:</label>
					<input
						type="text"
						id="image"
						name="image"
						value={form.image}
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Update</button>
			</form>
		</div>
	)
}

export default UpdateProfile
