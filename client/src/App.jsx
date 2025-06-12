import { useState } from 'react'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginFrom'
import ResumeProfile from './pages/ResumeProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <RegisterForm/> */}
      {/*<LoginForm/>*/}
      <ResumeProfile/>
    </>
  )
}

export default App
