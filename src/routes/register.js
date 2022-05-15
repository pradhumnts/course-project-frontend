import React, { useState, useContext } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button, Grid } from '@mui/material'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AuthContext from '../contexts/auth-context'

const Register = () => {

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
    const [isLogin, setIsLogin] = useState("")

    const authCtx = useContext(AuthContext)

    const emailInputHandler = (event) => {
        setEnteredEmail(event.target.value)
    }
    const passwordInputHandler = (event) => {
        setEnteredPass(event.target.value)
    }
    const usernameInputHandler = (event) => {
        setEnteredUsername(event.target.value)
    }
  
    const formSubmitHandler = (event) => {
        event.preventDefault()

        console.log(enteredEmail)
        console.log(enteredPass)
        console.log(enteredUsername)
       
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

        try{
          const data = {
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPass,
          }
          axios.post('http://127.0.0.1:8000/users/', data, {
            headers: {
                'Content-Type': 'application/json'
            },
          }).then(function (response) {
                console.log(response.data)
                authCtx.login(response.data.token)
        }).catch(function (error) {
            console.log(error)
            if(!!error.response.data.non_field_errors){
                setErrors([...error.response.data.non_field_errors])
            }
            else{
                setErrors(["Something Went Wrong!"])
            }
        })
        }catch(err) {
          console.log(err, "Hello")
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
            <Box sx={{ my:6, width: '25%' }}>
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
            <Typography variant="p" component="p">Already have an account? <Link to="/login">Log in</Link>.</Typography>
        </Box>
    </Box>
  )
}

export default Register