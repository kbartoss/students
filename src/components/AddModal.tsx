import React, { useState } from 'react'

type StudentData = {
	id: number
	name: string
	surname: string
	phoneNumber: string
	mail: string
	grade: number
}

type AddModalProps = {
	confirmAdding: (newStudent: StudentData) => void
}

const AddModal = ({ confirmAdding }: AddModalProps) => {
	const [newStudent, setNewStudent] = useState({
		name: '',
		surname: '',
		phoneNumber: '',
		mail: '',
		grade: 1,
	})
	const [errors, setErrors] = useState<string[]>([])

	const handleInputChange = (event: any) => {
		const { name, value } = event.target
		setNewStudent({ ...newStudent, [name]: value })
	}

	const handleGradeChange = (event: any) => {
		const { value } = event.target
		setNewStudent({ ...newStudent, grade: parseInt(value) })
	}

	const handleConfirmAdding = () => {
		const newErrors: string[] = []

		if (newStudent.name.length < 3 || newStudent.name.length > 30) {
			newErrors.push('Imię powinno mieć od 3 do 30 znaków.')
		}

		if (newStudent.surname.length < 3 || newStudent.surname.length > 30) {
			newErrors.push('Nazwisko powinno mieć od 3 do 30 znaków.')
		}

		if (!/^[0-9]{1,9}$/.test(newStudent.phoneNumber)) {
			newErrors.push('Numer telefonu powinien składać się z maksymalnie 9 cyfr.')
		}

		if (!/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/.test(newStudent.mail)) {
			newErrors.push('Nieprawidłowy format adresu e-mail.')
		}

		if (newErrors.length === 0) {
			confirmAdding(newStudent)
			setNewStudent({ name: '', surname: '', phoneNumber: '', mail: '', grade: 1 })
			setErrors([])
		} else {
			setErrors(newErrors)
		}
	}

	return (
		<div className="add-modal">
			<p className="add-modal__title">Dodaj nowego ucznia</p>
			<p className="add-modal__input-title">Imię</p>
			<input
				type="text"
				className="add-modal__input"
				name="name"
				value={newStudent.name}
				onChange={handleInputChange}
				required
				minLength={3}
				maxLength={30}
			/>
			{errors.includes('Imię powinno mieć od 3 do 30 znaków.') && (
				<span className="add-modal__error">Imię powinno mieć od 3 do 30 znaków.</span>
			)}

			<p className="add-modal__input-title">Nazwisko</p>
			<input
				type="text"
				className="add-modal__input"
				name="surname"
				value={newStudent.surname}
				onChange={handleInputChange}
				required
				minLength={3}
				maxLength={30}
			/>
			{errors.includes('Nazwisko powinno mieć od 3 do 30 znaków.') && (
				<span className="add-modal__error">Nazwisko powinno mieć od 3 do 30 znaków.</span>
			)}

			<p className="add-modal__input-title">Numer telefonu</p>
			<input
				type="text"
				className="add-modal__input"
				name="phoneNumber"
				value={newStudent.phoneNumber}
				onChange={handleInputChange}
				required
				pattern="[0-9]{1,9}"
				maxLength={9}
			/>
			{errors.includes('Numer telefonu powinien składać się z maksymalnie 9 cyfr.') && (
				<span className="add-modal__error">Numer telefonu powinien składać się z maksymalnie 9 cyfr.</span>
			)}

			<p className="add-modal__input-title">Adres e-mail</p>
			<input
				type="text"
				className="add-modal__input"
				name="mail"
				value={newStudent.mail}
				onChange={handleInputChange}
				required
				pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
			/>
			{errors.includes('Nieprawidłowy format adresu e-mail.') && (
				<span className="add-modal__error">Nieprawidłowy format adresu e-mail.</span>
			)}

			<p className="add-modal__input-title">Wystaw ocenę</p>
			<select className="add-modal__input" name="grade" value={newStudent.grade} onChange={handleGradeChange} required>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>

			<button className="add-modal__btn" onClick={handleConfirmAdding}>
				Dodaj ucznia
			</button>
		</div>
	)
}

export default AddModal
