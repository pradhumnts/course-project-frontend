import React from 'react'
import NavBar from '../components/NavBar'

const Categories = () => {
  return (
    <div>
  
    <NavBar />
    <section className="slice slice-lg">
    
        <div className="container">
        
            <div className="row mb-5 justify-content-center text-center">
                <div className="col-lg-8 col-md-10">
                    <h2 className=" mt-4">Course Categories</h2>
                    <div className="mt-2">
                        <p className="lead lh-180">Find a course and begin your own future here</p>
                    </div>
                </div>
            </div>
    
            <div className="card">
                <div className="card-body row align-items-center">
                    <div className="col-md-6 col">
                        <div className="media align-items-center">
                            <div>
                                <span className="badge badge-lg badge-dot mr-3">
                                    <i className="bg-primary"></i>
                                </span>
                            </div>
                            <div className="media-body">
                                <a href="support-topic.html" className="h6 stretched-link mb-0">Which license do I need?</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
            
                        <hr className="mt-3 mb-4 d-md-none" />
                        
                        <div className="row align-items-center">
                            <div className="col">
                                <a href="#" className="stretched-link">
                                    <i data-feather="edit-3"></i><span className="h6 text-sm ml-3">5 questions</span>
                                </a>
                            </div>
                            <div className="col-auto">
                                <a href="#" className="stretched-link">
                                    <i data-feather="clock"></i><span className="h6 text-sm ml-3">course name</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        
    </div>
  )
}

export default Categories