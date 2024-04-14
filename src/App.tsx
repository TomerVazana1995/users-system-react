import { Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import UsersPage from './pages/UsersPage'
import LoginPage from './pages/LoginPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import Header from './components/Header'
import './App.css'


function App() {

  return (
    <div>
      <Header/>
    <Routes >
      <Route path='/' element={<SignUpPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/changePassword/:role' element={<ChangePasswordPage/>}/>
      <Route path='/users/:role' element={<UsersPage/>}/>
    </Routes>
    </div>
  )
}

export default App
