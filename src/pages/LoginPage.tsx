import React from 'react'
import axios from 'axios'
import { useUser } from '../context'
import { useNavigate } from 'react-router-dom';


function LoginPage() {

    const {user, setUser} = useUser();
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement >) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
        console.log(user)
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const response = await axios.get(`http://localhost:8000/login/`, {params: {email: user.email, password: user.password}})
            if(response.status === 404){
                alert("Please try again")
            }
            if(response.status === 200){
                setUser(response.data)
            }
        } catch (error: any) {
            alert(`Please try again. code ${error.response.status}`)
        }
    }

    const goToSignUp = () => {
        navigate('/')
    }

    React.useEffect(() => {
        if (user.role) {
            alert(`Login successful, welcome ${user.fullName}`)
            navigate(`/users/${user.role}`);
        }
    }, [user.role]);

    return (
        <div className='loginContainer'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className='loginForm'>
                <input type='text' name="email" placeholder='Email' value={user.email} onChange={handleChange} required />
                <input type='text' name="password" placeholder='Password' value={user.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p style={{cursor: 'pointer'}} onClick={goToSignUp}>Dont have an account? click here to sign up</p>
        </div>
    )
}

export default LoginPage