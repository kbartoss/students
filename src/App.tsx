import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Start from './components/Start'
import Students from './components/Students'

function App() {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => {
		setIsOpen(prevIsOpen => !prevIsOpen)
	}

	return (
		<>
			<Navbar toggle={toggle} />
			<div className="container">
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Routes>
					<Route path="/" element={<Start />} />
					<Route path="/students" element={<Students />} />
				</Routes>
			</div>
		</>
	)
}

export default App
