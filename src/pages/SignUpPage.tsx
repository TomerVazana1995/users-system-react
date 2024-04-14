import React from "react"
import axios from "axios"
import { useUser } from "../context"
import { useNavigate } from "react-router-dom"


const SignUpPage = () => {

  const {user, setUser} = useUser();
  const navigate = useNavigate()

  const signInOrCreateNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8000/users/', {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        role: user.role
      })
      if(response.status === 201){
        navigate(`/users/${user.role}`)
      } 
    } catch (error) {
      console.log("Try different email")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  return (
    <div className="signUnContainer">
        <h2>Sign Up</h2>
        <form className="signUpForm" onSubmit={signInOrCreateNewUser}>
            <input type='text' name="fullName" placeholder='Full name' value={user.fullName} onChange={handleChange} required/>
            <input type='text' name="email" placeholder='Email' value={user.email} onChange={handleChange} required/>
            <input type='text' name="password" placeholder='Password' value={user.password} onChange={handleChange} required/>
            <div className="selectContainer">
            <select name="role" value={user.role} onChange={handleChange} required>
                <option value="">Select role</option>
                <option value="worker">Worker</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Sign Up</button>
            </div>
        </form>
        <p onClick={() => navigate("/login")} >Already sign up? click here to login</p>
    </div>
  )
}

export default SignUpPage