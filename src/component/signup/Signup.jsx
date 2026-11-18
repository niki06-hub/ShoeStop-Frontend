import React,{useState} from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')

  const url = "${import.meta.env.VITE_API_URL}/signup"

  const changeNameHandler = (e) => {
      setName(e.target.value)
  }
  const changeMailHandler = (e) => {
      setMail(e.target.value)
  }
  const changePasswordHandler = (e) => {
      setPassword(e.target.value)
  }

  const submitHandler = async () => {
    try {
        const res = await axios.post(url, {
            name,
            email,
            password
        });

        localStorage.setItem('token', JSON.stringify(res.data.token));
        navigate('/');

    } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
    }
};


  return (
    <div className='signup'>
      <input type="text" placeholder='username' onChange={(e) => { changeNameHandler(e) }}/>
      <input type="text" placeholder='email' onChange={(e) => { changeMailHandler(e) }}/>
      <input type="password" placeholder='password'  onChange={(e) => { changePasswordHandler(e) }} />
      <button onClick={() => { submitHandler() }}>SignUp</button>
    </div>
  )
}

export default Signup