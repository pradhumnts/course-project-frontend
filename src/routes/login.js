import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button } from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import useAuth from '../hooks/useAuth'

const Login = () => {

    const { login } = useAuth()

    let navigate = useNavigate();

    const [enteredUsername, setEnteredUsername] = useState("")
    const [enteredPass, setEnteredPass] = useState("")
    const [errors, setErrors] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")

    const usernameInputHandler = (event) => {
        setEnteredUsername(event.target.value)
    }
    const passwordInputHandler = (event) => {
        setEnteredPass(event.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (enteredUsername == ""){
            setUsernameError(true)
            setUsernameErrorMsg("Username can not be empty!")
        }
        if (enteredPass.length < 6){
            setPasswordError(true)
            setPasswordErrorMsg("Password must be at least 6 characters")
        }
  
        try {
            await login(enteredUsername, enteredPass);
        } catch (error) {
            if(!!error.response.data.non_field_errors){
                    setErrors([...error.response.data.non_field_errors])
                }
                else{
                    setErrors(["Something Went Wrong!"])
                }
        }
        
        navigate("/")

    }

  return (
    <Box>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', my: 10}}>
            <Typography variant="h4" component="h4" sx={{ mb: 1 }}>Login</Typography>
            <Typography variant="h6" component="p">Sign in to your account to continue.</Typography>
            {errors.length > 0 && 
                <Box sx={{ mt:3 }}>
                    {errors.map(err =>
                        <Alert severity="error">{err}</Alert>
                    )}
                </Box>
            }
            <Box sx={{ my:6, width: '25%' }}>
                <form onSubmit={(e) => handleLogin(e)}>
               
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4, width: '100%', }}>
                <TextField
                    required
                    type="text"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={usernameError}
                    helperText={usernameErrorMsg}
                    onChange={usernameInputHandler}
                />
                <TextField
                    required
                    type="password"
                    label="Password"
                    error={passwordError}
                    helperText={passwordErrorMsg}
                    variant="outlined"
                    fullWidth
                    onChange={passwordInputHandler}
                />
                <Button variant="contained" type="submit">Login</Button>
                </Box>
                </form>
            </Box>
            <Typography variant="p" component="p">Not registered? <Link to="/register">Create account</Link>.</Typography>
        </Box>
    </Box>
  )
}

export default Login