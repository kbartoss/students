import React from 'react'

type DeleteModalProps = {
	cancelDelete: () => void
	confirmDelete: () => void
	selectedStudent: {
		name: string
		surname: string
	}
}

const DeleteModal = ({ cancelDelete, confirmDelete, selectedStudent}: DeleteModalProps) => {
	return (
		<div className="delete-modal">
			<p className="delete-modal__question">Na pewno chcesz usunąć tego ucznia z listy?</p>
			<p className="delete-modal__info">Ta operacja bezpowrotnie skasuje danego ucznia z bazy danych.</p>
			<p className="delete-modal__student">{selectedStudent.name} {selectedStudent.surname}</p>
			<div className="delete-modal__btns">
				<button className="delete-modal__btns--cancel" onClick={cancelDelete}>
					Anuluj
				</button>
				<button className="delete-modal__btns--delete" onClick={confirmDelete}>
					Usuń
				</button>
			</div>
		</div>
	)
}

export default DeleteModal
