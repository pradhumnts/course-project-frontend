import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useResponsive from '../hooks/useResponsive';
import Alert from '@mui/material/Alert';
import ClipLoader from "react-spinners/ClipLoader";
import { useTheme } from '@mui/material'

const Login = () => {
    
    const theme = useTheme()

    const isDesktop = useResponsive('up', 'sm');

    const { login } = useAuth()

    const {state} = useLocation();

    let navigate = useNavigate();

    const [enteredUsername, setEnteredUsername] = useState("")
    const [enteredPass, setEnteredPass] = useState("")
    const [errors, setErrors] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [usernameErrorMsg, setUsernameErrorMsg] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")

    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        if(!!state){
            setErrors([...errors, state])
        }
    }, [state, errors])

    const usernameInputHandler = (event) => {
        setEnteredUsername(event.target.value)
    }
    const passwordInputHandler = (event) => {
        setEnteredPass(event.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (enteredUsername === ""){
            setUsernameError(true)
            setUsernameErrorMsg("Username can not be empty!")
        }
        if (enteredPass.length < 6){
            setPasswordError(true)
            setPasswordErrorMsg("Password must be at least 6 characters")
        }
  
        try {
            setLoading(true)
            await login(enteredUsername, enteredPass);
            navigate("/user/courses/")
        } catch (error) {
            setLoading(false)
            if(!!error.response.data.non_field_errors){
                    setErrors([...error.response.data.non_field_errors])
                }
                else{
                    setErrors(["Something Went Wrong!"])
                }
        }
    }
    if (loading){
        return (
        <Box sx={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ClipLoader size={50} css={{ display: 'block', margin: "auto" }} color={theme.palette.primary.main} speedMultiplier={1.5} />
        </Box>
        )
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
             
            <Box sx={{ my:6, width: isDesktop ? '25%' : "75%" }}>
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
            <Typography variant="p" component="p">Not registered? <Link to="/register"><Typography variant="span" sx={{ color: theme.palette.primary.main }}>Create account</Typography></Link>.</Typography>
        </Box>
    </Box>
  )
}

export default Login