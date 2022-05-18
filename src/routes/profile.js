import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import useAuth from '../hooks/useAuth';
import { TextField } from '@mui/material'

const Profile = () => {
    const { user } = useAuth()

    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)

    const fNameInputHandler = (event) => {
        setFirstName(event.target.value)
    }

    const lNameInputHandler = (event) => {
        setLastName(event.target.value)
    }

    const emailInputHandler = (event) => {
        setEmail(event.target.value)
    }

    // useEffect(() => {
    //     const loadUser = async () => {
    //         let fName = await user.first_name
    //         let lName = await user.last_name
    //         let email = await user.email
    //         let username = await user.username

    //         setFirstName(fName)
    //         setLastName(lName)
    //         setEmail(email)
    //         setUsername(username)
    //     }

    //     loadUser()

    // }, [user])

    return (
        <div>
        <NavBar />
        <section className="pt-5 bg-section-secondary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="row align-items-center">
                            <div className="col">
                            
                                <span className="surtitle">Your account</span>
                            
                                <h1 className="h2 mb-0">
                                    Settings
                                </h1>
                            </div>
                        </div>
                        <div className="row align-items-center mt-4">
                            <div className="col">
                                <h3 className="mb-0">
                                    {firstName ? <span> <b>{lastName}</b> {lastName} </span> : <b>{username}</b>}
                                </h3>
                                {firstName && <span className="text-muted d-block">{firstName} {lastName}</span>}    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="slice slice-sm bg-section-secondary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">  
                                <div>
                                    <h5 className="mb-3">General information</h5>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    required
                                                    type="text"
                                                    label="First Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={firstName}
                                                    onChange={fNameInputHandler}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                            <TextField
                                                    required
                                                    type="text"
                                                    label="Last Name"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={lastName}
                                                    onChange={lNameInputHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <TextField
                                            sx={{ mt:3 }}
                                                    required
                                                    type="email"
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={email}
                                                    onChange={emailInputHandler}
                                                />
                                            </div>
                                           
                                        </div>
                                        <div className="mt-3">
                                            <button type="button" className="btn btn-sm btn-primary" id="save">Save</button>
                                        </div>
                                    </form>
                                </div>   
                                <hr/>   
                              
                                <div>
                                    <div className="page-inner-header mb-4">
                                        <h5 className="mb-1">Delete account</h5>
                                        <p className="text-muted mb-0">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <button type="button" className="btn btn-danger" id="delete" >Delete your account</button>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Profile