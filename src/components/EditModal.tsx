import { createClient } from '@supabase/supabase-js'
import React, { useState } from 'react'

const supabase = createClient(
	'https://slfdqmtcbbnoxyvnwftm.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZmRxbXRjYmJub3h5dm53ZnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzOTc3NTgsImV4cCI6MTk5MTk3Mzc1OH0.AETqpx9QZ_oPvkZhQWGBq-DFl_gYwsei7tz6v3gy1MY'
)

type StudentData = {
	id: number
	name: string
	surname: string
	phoneNumber: string
	mail: string
	grade: number
}

type EditModalProps = {
	confirmEditing: () => void
	selectedStudent: {
		id: number
		name: string
		surname: string
		phoneNumber: string
		mail: string
		grade: number
	}
	setStudentsData: (data: StudentData[]) => void
}

const EditModal = ({ confirmEditing, selectedStudent, setStudentsData }: EditModalProps) => {
	const [editedStudent, setEditedStudent] = useState(selectedStudent)

	const [name, setName] = useState(selectedStudent.name)
	const [surname, setSurname] = useState(selectedStudent.surname)
	const [phoneNumber, setPhoneNumber] = useState(selectedStudent.phoneNumber)
	const [mail, setMail] = useState(selectedStudent.mail)
	const [grade, setGrade] = useState(selectedStudent.grade)

	const handleConfirmEditing = async () => {
		const { data, error } = await supabase
			.from('listStudents')
			.update({ name, surname, phoneNumber, mail, grade })
			.eq('id', selectedStudent.id)

		if (error) {
			console.log('Error updating student:', error.message)
		} else {
			console.log('Student updated successfully:', selectedStudent.name)
			confirmEditing()
			const { data: updatedData } = await supabase.from('listStudents').select('*')
			setStudentsData(updatedData)
		}
	}

	return (
		<div className="edit-modal">
			<p className="edit-modal__title">Edytuj dane ucznia</p>
			<p className="edit-modal__input-title">Imię</p>
			<input
				type="text"
				className="edit-modal__input"
				name="name"
				defaultValue={selectedStudent.name}
				required
				minLength={3}
				maxLength={30}
				onChange={e => setName(e.target.value)}
			/>

			<p className="edit-modal__input-title">Nazwisko</p>
			<input
				type="text"
				className="edit-modal__input"
				name="surname"
				defaultValue={selectedStudent.surname}
				required
				minLength={3}
				maxLength={30}
				onChange={e => setSurname(e.target.value)}
			/>

			<p className="edit-modal__input-title">Numer telefonu</p>
			<input
				type="text"
				className="edit-modal__input"
				name="phoneNumber"
				defaultValue={selectedStudent.phoneNumber}
				required
				pattern="[0-9]{1,9}"
				maxLength={9}
				onChange={e => setPhoneNumber(e.target.value)}
			/>

			<p className="edit-modal__input-title">Adres e-mail</p>
			<input
				type="text"
				className="edit-modal__input"
				name="mail"
				defaultValue={selectedStudent.mail}
				required
				pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
				onChange={e => setMail(e.target.value)}
			/>

			<p className="edit-modal__input-title">Wystaw ocenę</p>
			<select
				className="edit-modal__input"
				name="grade"
				defaultValue={selectedStudent.grade}
				onChange={e => setGrade(Number(e.target.value))}>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>

			<button className="edit-modal__btn" onClick={handleConfirmEditing}>
				Zatwierdź
			</button>
		</div>
	)
}

export default EditModal
