import React from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom";
import '../assets/css/quick-website.css'

const Index = () => {

    const course = {
        id: 1,
        name: 'UWorld USMLE',
        description: 'Save Soil is a global movement launched by Sadhguru, to address the soil crisis by bringing together people from around the world to stand up for Soil Health, and supporting leaders of all nations to institute national policies and actions toward increasing the organic content in cultivable Soil.',
        createdAt: '23 April 2022'
    }

  return (
    <div>
        <NavBar />
        <section className="slice slice-lg py-8 bg-cover bg-size--cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1499914485622-a88fac536970?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"}}>
            <span className="mask bg-dark opacity-4"></span>
            <div className="container d-flex align-items-center" data-offset-top="#navbar-main">
                <div className="col py-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 col-lg-7 text-center">
                            <h1 className="display-4 text-white mb-2"><strong>Quick</strong> Blog</h1>
                            <span className="text-white text-sm">#1 blog on web design resources on the internet</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="slice pt-5 pb-7 bg-section-secondary">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <div className="card hover-translate-y-n3 hover-shadow-lg overflow-hidden">  
                            <div className="card-body py-4">
                                <small className="d-block text-sm mb-2">{course.createdAt}</small>
                                <Link to={`/course/${course.id}`} className="h5 stretched-link lh-150">{course.name}</Link>
                                <p className="mt-3 mb-0 lh-170">{course.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </section>
    </div>
  )
}

export default Index