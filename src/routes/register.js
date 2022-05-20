import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button } from '@mui/material'
import {Link} from 'react-router-dom'
import Alert from '@mui/material/Alert';
import useAuth from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import useResponsive from '../hooks/useResponsive';
import { useTheme } from '@mui/material'

const Register = () => {

    const theme = useTheme()

    const isDesktop = useResponsive('up', 'sm');

    let navigate = useNavigate()

    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPass, setEnteredPass] = useState("")
    const [enteredUsername, setEnteredUsername] = useState("")
    const [errors, setErrors] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorMsg, setEmailErrorMsg] = useState("")
    const { register } = useAuth()

    const emailInputHandler = (event) => {
        setEnteredEmail(event.target.value)
    }
    const passwordInputHandler = (event) => {
        setEnteredPass(event.target.value)
    }
    const usernameInputHandler = (event) => {
        setEnteredUsername(event.target.value)
    }

    const handleRegister = async (e) => {
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
            await register(enteredUsername, enteredPass, enteredEmail)
            navigate("/", {state: "Successfully Registered!"})

        } catch (error) {
            console.log(error)
            if(!!error.response.data.non_field_errors){
                    setErrors([...error.response.data.non_field_errors])
                }
                else if(!!error.response.data.username){
                    setErrors([...error.response.data.username])
                }else{
                    setErrors(["Something Went Wrong!"])
                }
        }
       
      }
  return (
    <Box>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', my: 10}}>
            <Typography variant="h4" component="h4" sx={{ mb: 1 }}>Create New account</Typography>
            <Typography variant="h6" component="p">Register to create an account.</Typography>
            {errors.length > 0 && 
                <Box sx={{ mt:3 }}>
                    {errors.map(err =>
                        <Alert severity="error">{err}</Alert>
                    )}
                </Box>
            }
            <Box sx={{ my:6, width: isDesktop ? '25%' : "75%" }}>
                <form onSubmit={handleRegister}>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 4, width: '100%', }}>
                <TextField
                    required
                    type="text"
                    error={usernameError}
                    helperText={usernameErrorMsg}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    onChange={usernameInputHandler}
                />
                <TextField
                    required
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={emailError}
                    helperText={emailErrorMsg}
                    onChange={emailInputHandler}
                />
                <TextField
                    required
                    error={passwordError}
                    helperText={passwordErrorMsg}
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    onChange={passwordInputHandler}
                />
                <Button variant="contained" type="submit">Register</Button>
                </Box>
                </form>
            </Box>
            <Typography variant="p" component="p">Already have an account? <Link to="/login"><Typography variant="span" sx={{ color: theme.palette.primary.main }}>Log in</Typography></Link>.</Typography>
        </Box>
    </Box>
  )
}

export default Register