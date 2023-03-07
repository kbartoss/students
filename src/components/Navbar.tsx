import React from 'react'
import { Squash as Hamburger } from 'hamburger-react'

type NavbarProps = {
	toggle: () => void
}


const Navbar = ({ toggle }: NavbarProps) => {
	return (
		<div className="nav">
			<div className="nav__hamburger" onClick={toggle}>
				<Hamburger color="#fff" size={40} />
			</div>
		</div>
	)
}

export default Navbar
