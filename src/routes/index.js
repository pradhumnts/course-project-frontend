import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Link } from "react-router-dom";
import '../assets/css/quick-website.css'
import { useLocation } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button, Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Index = () => {
    const {state} = useLocation();
    
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if(!!state){
            setOpen(true)
        }
    }, [state])

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  

    const course = {
        id: 1,
        name: 'UWorld USMLE',
        description: 'Save Soil is a global movement launched by Sadhguru, to address the soil crisis by bringing together people from around the world to stand up for Soil Health, and supporting leaders of all nations to institute national policies and actions toward increasing the organic content in cultivable Soil.',
        createdAt: '23 April 2022'
    }

  return (
    <div>
        <NavBar />
        {!!state &&  
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {state}
                </Alert>
            </Snackbar>
        }
        <section className="slice slice-lg py-8 bg-cover bg-size--cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1499914485622-a88fac536970?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"}}>
            <span className="mask opacity-4" style={{ backgroundColor: "#000" }}></span>
            <div className="container d-flex align-items-center" data-offset-top="#navbar-main">
                <div className="col py-5">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7 col-lg-7 text-center">
                            <h1 className="display-4 text-white mb-2">All Courses</h1>
                            <span className="text-white text-sm">List of all the courses and content available.</span>
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
                                <Typography variant="h4">{course.name}</Typography>
                                <p className="mt-2 mb-0 lh-170">{course.description}</p>
                               <Link to="/payment"><Button variant="outlined" sx={{ mt:2, width: "100%" }}>Enroll Now</Button></Link>
                            </div>
                            <div class="card-footer border-0 delimiter-top">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span class="text-sm mb-0 avatar-content">27 Jan, 2022</span>
                                        </div>
                                        <div class="col text-right text-right">
                                            <FileDownloadOutlinedIcon sx={{ mr:.6, width: 20 }} />
                                            <span>350</span>
                                        </div>
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

export default Index