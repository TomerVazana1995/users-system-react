import React from 'react'
import axios from 'axios'
import { useUser } from '../context'
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage = () => {
    const [userPassword, setUserPassword] = React.useState({
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = React.useState<string>('');

    const navigate = useNavigate()

    const { user } = useUser()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserPassword({
            ...userPassword,
            [name]: value
        })
    }

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (userPassword.password !== userPassword.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (userPassword.password === userPassword.confirmPassword) {
            try {
                const response = await axios.put(`http://localhost:8000/users/${user.id}`, {password: userPassword.password})
                if(response.status === 200)
                    alert("Password updated successfuly")
            } catch (error) {
                alert(error)
            } finally {
                navigate(`/users/${user.role}`)
            }
        }
        setError('');
    }

    return (
        <div className="changePasswordContainer">
            <h2>Change password</h2>
            <form className="changePasswordForm" onSubmit={handleChangePassword}>
                <input type='text' name="password" placeholder='Password' value={userPassword.password} onChange={handleChange} required />
                <input type='text' name="confirmPassword" placeholder='Confirm password' value={userPassword.confirmPassword} onChange={handleChange} required />
                {error && <div>{error}</div>}
                <button type="submit">Update password</button>
            </form>
        </div>
    )
}

export default ChangePasswordPage