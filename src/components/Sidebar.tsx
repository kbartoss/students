import React, { useState, memo } from 'react'
import Home from '../img/home.png'
import HomeWhite from '../img/home-white.png'
import Users from '../img/users.png'
import UsersWhite from '../img/users-white.png'
import { Link, useLocation } from 'react-router-dom'

type SidebarProps = {
	isOpen: boolean
	toggle: () => void
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
	const location = useLocation()

	const isActive = (path: string) => {
		return location.pathname === path
	}

	function isMobileView() {
		return window.innerWidth <= 768;
	}

	return (
		<div className={`sidebar ${isOpen ? '' : 'closed'}`} 
			style={{ width: isOpen ? (isMobileView() ? '66%' : '310px') : '' }}>
			<Link to="/" className={`sidebar__element ${isActive('/') ? 'active' : ''}`}>
				<img 
					src={isActive('/') ? HomeWhite : Home} 
					alt="home icon" 
					className={`sidebar__element--icon ${isMobileView() ? 'sidebar__element--icon-white-house' : 'sidebar__element--icon-white-house'}`} 
				/>
					{isOpen && <p className="sidebar__element--text">Start</p>}
			</Link>
			<Link to="/students" className={`sidebar__element ${isActive('/students') ? 'active' : ''}`}>
				<img 
					src={isActive('/students') ? UsersWhite : Users} 
					alt="users icon" 
					className={`sidebar__element--icon ${isMobileView() ? 'sidebar__element--icon-white-users' : ''}`} 
				/>
				{isOpen && <p className="sidebar__element--text">Uczniowie</p>}
			</Link>
		</div>
	)
}

export default Sidebar
