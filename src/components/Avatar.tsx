import React from 'react'

type AvatarProps = {
	initials: string
}

const Avatar = ({ initials }: AvatarProps) => {
	const avatarColor = React.useMemo(() => {
		const colors = ['#A8A1C1', '#F7CAC9', '#A5C5BF', '#A9D7A9', '#F7EAC8']
		const randomIndex = Math.floor(Math.random() * colors.length)
		return colors[randomIndex]
	}, [])

	return (
		<div className="avatar" style={{ backgroundColor: avatarColor }}>
			{initials}
		</div>
	)
}

export default Avatar
