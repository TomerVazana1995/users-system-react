import React from 'react'
import axios from 'axios'
import { User } from '../types'
import { useUser } from '../context'
import { useNavigate } from 'react-router-dom'

const UsersPage = () => {

    const [users, setUsers] = React.useState([])
    const { user } = useUser()
    const role = user.role
    const navigate = useNavigate()

    if(role === ''){
        navigate('/login')
    }

    React.useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/`)
                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getAllUsers()
    }, [])

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/users/${id}`)
            setUsers(currentUsers => currentUsers.filter((user: User) => user.id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const goToChangePassword = () => {
        navigate(`/changePassword/${user.role}`)
    }

    return (
        <div className='usersContainer'>
            <h2>Users</h2>
            <table>
                <tbody>
                    {
                        users.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{role === 'admin' && (<button onClick={() => deleteUser(user.id as number)}>DELETE</button>)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <button className='button' onClick={goToChangePassword}>Change password</button>
        </div>
    )
}

export default UsersPage