import React from 'react'
import NavBar from '../components/NavBar'

const Profile = () => {
  return (
    <div>
    <NavBar />
    <section class="pt-5 bg-section-secondary">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <div class="row align-items-center">
                        <div class="col">
                           
                            <span class="surtitle">Your account</span>
                           
                            <h1 class="h2 mb-0">
                                Settings
                            </h1>
                        </div>
                    </div>
                    <div class="row align-items-center mt-4">
                        <div class="col">
                            <h3 class="mb-0">
                                <b>Emma</b> Stone
                            </h3>
                            <span class="text-muted d-block">Sales Manager</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="slice slice-sm bg-section-secondary">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-lg-12">
                            
                            <div>
                             
                                <h5 class="mb-3">General information</h5>
                                
                                <form>
                                   
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-control-label">First name</label>
                                                <input class="form-control" type="text" placeholder="Enter your first name" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Last name</label>
                                                <input class="form-control" type="text" placeholder="Also your last name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Email</label>
                                                <input class="form-control" type="email" placeholder="name@exmaple.com" />
                                                <small class="form-text text-muted mt-2">This is the main email address that we'll send notifications.</small>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-control-label">Phone</label>
                                                <input class="form-control" type="text" placeholder="+40-777 245 549" />
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="mt-3">
                                        <button type="button" class="btn btn-sm btn-primary" id="save">Save</button>
                                    </div>
                                </form>
                            </div>   
                            <hr/>   
                            {/* <div class="card mt-4">
                                <div class="card-body">
                                    <div class="row row-grid align-items-center">
                                        <div class="col-lg-8">
                                            <div class="media align-items-center">
                                                <span class="avatar bg-danger text-white rounded-circle mr-3">
                                                    <i data-feather="bell"></i>
                                                </span>
                                                <div class="media-body">
                                                    <h5 class="mb-0">Pro Account</h5>
                                                    <p class="text-muted lh-150 text-sm mb-0">
                                                        Your account will auto-renew on January 10th, 2020
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto flex-fill mt-4 mt-sm-0 text-sm-right d-none d-lg-block">
                                            <a href="#" class="btn btn-sm btn-neutral rounded-pill">Manage</a>
                                        </div>
                                    </div>
                                </div>
                            </div>  */}
 
                            <div>
                                <div class="page-inner-header mb-4">
                                    <h5 class="mb-1">Delete account</h5>
                                    <p class="text-muted mb-0">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <button type="button" class="btn btn-danger" id="delete" >Delete your account</button>
                                    </div>
                                </div>
                                <div class="modal fade" id="modal_account_deactivate" tabindex="-1" role="dialog" aria-labelledby="modal_account_deactivate" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="pt-5 text-center">
                                                    <div class="icon text-danger">
                                                        <i data-feather="user-x" class=""></i>
                                                    </div>
                                                    <h4 class="h5 mt-5 mb-3">Extremely important</h4>
                                                    <p>
                                                        We will immediately delete all of your personal data from our database. This action can not be undone. Are you sure you want to do this?
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-sm btn-link text-danger btn-zoom--hover font-weight-600">Delete</button>
                                                <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
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