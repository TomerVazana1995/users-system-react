import { useNavigate } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io";
import { useUser } from "../context";


const Header = () => {

    const {user, setUser} = useUser()
    const navigate = useNavigate()

    const handleLogout = () => {
      alert("You are logging out. goodbye")
        setUser({
            id: null,
            fullName: '',
            email: '',
            password: '',
            role: ''
        })
        navigate('/')
    }

  return (
    <div className="header">
        <h2>Users-Managment</h2>
        {user.id! && <IoIosLogOut size={30} onClick={handleLogout} cursor="pointer"/>}
    </div>
  )
}

export default Header