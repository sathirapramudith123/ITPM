import { useState } from 'react'
import './App.css'
import RegisterForm from './pages/RegisterForm'
import LoginForm from './pages/LoginFrom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegisterForm/> 
      {/*<LoginForm/>*/}
    </>
  )
}

export default App
