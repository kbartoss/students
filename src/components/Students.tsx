import { useEffect, useMemo, useState } from 'react'
import SearchIcon from '../img/search-icon.png'
import TrashIcon from '../img/trash.png'
import EditIcon from '../img/edit.png'
import Avatar from './Avatar'
import DeleteModal from './DeleteModal'
import AddModal from './AddModal'

import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { useTable, useSortBy } from 'react-table'
import EditModal from './EditModal'

import styled from 'styled-components'

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(82, 82, 82, 0.25);
	z-index: 10;
`

const supabase = createClient(
	'https://slfdqmtcbbnoxyvnwftm.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZmRxbXRjYmJub3h5dm53ZnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzOTc3NTgsImV4cCI6MTk5MTk3Mzc1OH0.AETqpx9QZ_oPvkZhQWGBq-DFl_gYwsei7tz6v3gy1MY'
)

type StudentProps = {
	id: number
	name: string
	surname: string
	mail: string
	phoneNumber: string
	created_at: string
	grade: number
}

const Students = () => {
	const [studentsData, setStudentsData] = useState<StudentProps[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [selectedStudent, setSelectedStudent] = useState({})
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [showAddModal, setShowAddModal] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)

	useEffect(() => {
		const fetchStudents = async () => {
			const { data: studentsData, error } = await supabase.from(`listStudents`).select(`*`)
			if (error) {
				console.log('fetching error', error)
			} else {
				setStudentsData(studentsData as StudentProps[])
			}
		}
		fetchStudents()
	}, [])

	const deleteStudent = async (student: StudentProps) => {
		setSelectedStudent(student)
		setShowDeleteModal(true)
	}

	const confirmDelete = async () => {
		try {
			await supabase.from('listStudents').delete().eq('id', selectedStudent?.id)
			const updatedData = studentsData.filter(student => student.id !== selectedStudent?.id)
			setStudentsData(updatedData)
		} catch (error) {
			console.error('error deleting student', error)
		}
		setShowDeleteModal(false)
	}

	const cancelDelete = () => {
		setShowDeleteModal(false)
	}

	const addStudent = () => {
		setShowAddModal(true)
	}

	const confirmAdding = async (newStudent: any) => {
		const { data, error } = await supabase.from('listStudents').insert([newStudent])

		setShowAddModal(false)

		if (error) {
			console.error('error adding student', error)
		} else {
			const { data: updatedData } = await supabase.from('listStudents').select('*')
			setStudentsData(updatedData)
		}
	}

	const editStudent = (student: StudentProps) => {
		setSelectedStudent(student)
		setShowEditModal(true)
	}

	const confirmEditing = () => {
		setShowEditModal(false)
	}

	const closeModal = () => {
		setShowAddModal(false)
		setShowDeleteModal(false)
		setShowEditModal(false)
	}

	const gradeColor = (grade: number) => {
		if (grade >= 5) {
			return '#2FCD15'
		} else if (grade >= 3) {
			return '#EAE000'
		} else {
			return '#E84A35'
		}
	}

	const columns = useMemo(
		() => [
			{
				accessor: 'avatar',
				Cell: ({ row }: any) => {
					const nameInitial = row.original.name[0].toUpperCase()
					const surnameInitial = row.original.surname[0].toUpperCase()
					return <Avatar initials={`${nameInitial}${surnameInitial}`} />
				},
			},
			{
				Header: 'Imię',
				accessor: 'name',
				Cell: ({ row }: any) => {
					const fullName = `${row.original.name} ${row.original.surname}`
					return <p style={{ fontWeight: '500' }}>{fullName}</p>
				},
			},
			{
				Header: 'Adres e-mail',
				accessor: 'mail',
			},
			{
				Header: 'Nr. telefonu',
				accessor: 'phoneNumber',
				Cell: ({ value }: any) => {
					const phoneNumber = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
					return <p>+48 {phoneNumber}</p>
				},
			},
			{
				Header: 'Data dod.',
				accessor: 'created_at',
				Cell: ({ value }: any) => {
					return <p>{format(new Date(value), 'dd.MM.yyyy')}</p>
				},
			},
			{
				Header: 'Ocena',
				accessor: 'grade',
				Cell: ({ value }: any) => {
					return (
						<div style={{ backgroundColor: gradeColor(value) }} className="grade">
							{value}
						</div>
					)
				},
			},
			{
				Header: '',
				accessor: 'actions',
				Cell: ({ row }) => {
					return (
						<div className="icon-box">
							<img
								src={TrashIcon}
								alt="Search"
								className="student-icon trash"
								onClick={() => {
									deleteStudent(row.original)
								}}
							/>
							<img
								src={EditIcon}
								alt="Search"
								className="student-icon edit"
								onClick={() => {
									editStudent(row.original)
								}}
							/>
						</div>
					)
				},
			},
		],
		[]
	)

	const search = () => {
		return studentsData.filter(
			student =>
				student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				student.surname.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}

	const data = useMemo(
		() =>
			search().map(student => ({
				id: student.id,
				// name: student.name + ' ' + student.surname,
				name: student.name,
				surname: student.surname,
				mail: student.mail,
				phoneNumber: student.phoneNumber,
				created_at: student.created_at,
				grade: student.grade,
				actions: '',
			})),
		[studentsData, searchQuery]
	)

	const tableInstance = useTable({ columns, data })
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

	return (
		<div className="students">
			<div className="students__header">
				<h1 className='students__header--title'>Lista uczniów</h1>
				<div className="students__header--search">
					<input onChange={e => setSearchQuery(e.target.value)} type="search" placeholder="Szukaj uczniów..." />
					<img src={SearchIcon} alt="Search" className="search-icon" />
					<button onClick={addStudent}>+</button>
				</div>
			</div>

			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => (
									<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								))}
							</tr>
						)
					})}
				</tbody>
			</table>

			{showDeleteModal && (
				<>
					<Overlay onClick={closeModal}></Overlay>
					<DeleteModal cancelDelete={cancelDelete} confirmDelete={confirmDelete} selectedStudent={selectedStudent} />
				</>
			)}

			{showAddModal && (
				<>
					<Overlay onClick={closeModal}></Overlay>
					<AddModal confirmAdding={confirmAdding} />
				</>
			)}

			{showEditModal && (
				<>
					<Overlay onClick={closeModal}></Overlay>
					<EditModal confirmEditing={confirmEditing} selectedStudent={selectedStudent} setStudentsData={setStudentsData}/>
				</>
			)}
		</div>
	)
}

export default Students
