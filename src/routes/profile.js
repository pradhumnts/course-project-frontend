import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import useAuth from '../hooks/useAuth';
import { TextField } from '@mui/material'

const Profile = () => {
    const { user } = useAuth()

    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)

    const fNameInputHandler = (event) => {
        setFirstName(event.target.value)
    }

    const lNameInputHandler = (event) => {
        setLastName(event.target.value)
    }

    const emailInputHandler = (event) => {
        setEmail(event.target.value)
    }

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
                                    {user.first_name ? <span> <b>{user.first_name}</b> {user.last_name} </span> : <b>{user.username}</b>}
                                </h3>
                                {user.first_name && <span className="text-muted d-block">{user.first_name} {user.last_name}</span>}    
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
                                    <div className="modal fade" id="modal_account_deactivate" tabindex="-1" role="dialog" aria-labelledby="modal_account_deactivate" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="pt-5 text-center">
                                                        <div className="icon text-danger">
                                                            <i data-feather="user-x" className=""></i>
                                                        </div>
                                                        <h4 className="h5 mt-5 mb-3">Extremely important</h4>
                                                        <p>
                                                            We will immediately delete all of your personal data from our database. This action can not be undone. Are you sure you want to do this?
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-sm btn-link text-danger btn-zoom--hover font-weight-600">Delete</button>
                                                    <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
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
        </div>

        </div>
    )
}

export default Profile