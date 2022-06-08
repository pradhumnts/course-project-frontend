import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Container, Divider, Card, CardContent, Button, Box } from '@mui/material'
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import useResponsive from '../hooks/useResponsive'
import useAuth from '../hooks/useAuth'
import { useTheme } from '@mui/material/styles';

const UserCourses = () => {

    const theme = useTheme()

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const isDesktop = useResponsive('up', 'sm');

    const { logout } = useAuth()

    useEffect(() => {
        const get_user_courses = async () => {
            const accessToken = window.localStorage.getItem('accessToken');
   
            if (accessToken) {
                try{
                    const response = await axios.get('https://pradhumnts.pythonanywhere.com/users-courses/', {
                        headers: {
                            Authorization: `JWT ${accessToken}`,
                        }
                    })
                    setCourses(response.data)
                }catch(err){
                    logout()
                    window.localStorage.removeItem('accessToken')
                    
                    if(err.response.status === 401){
                        navigate("/login", {state: "Please login to your account to continue!"})
                    }
                }
                setLoading(false)
            }   
            else{
                navigate("/")
            }

        }
        get_user_courses()
    }, [courses, logout, navigate])

    if (loading){
        return (
        <Box sx={{ height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ClipLoader size={50} css={{ display: 'block', margin: "auto" }} color={theme.palette.primary.main} speedMultiplier={1.5} />
        </Box>
        )
    }
    return (
        <React.Fragment>
            <NavBar />
            <Container sx={{ py: 4 }} maxWidth="lg">
            <Typography variant={isDesktop ? "h4" : "h5"} sx={{ fontWeight: '500', mb:2 }}>My Courses</Typography>
            <Divider />
            {courses.length > 0 ? 
            <section className="pt-4 pb-7">
                <div className="row">
                    {courses.map(course => (
                        <div key={course.id} className="col-xl-4 col-md-6">
                        <div className="card hover-translate-y-n3 hover-shadow-lg overflow-hidden">  
                            <div className="card-body py-4">
                                <small className="d-block text-sm mb-2">{course.course.createdAt}</small>
                                <Link to={`/course/${course.id}`} className="h5 stretched-link lh-150">{course.course.courseName}</Link>
                                <p className="mt-3 mb-0 lh-170">{course.course.description}</p>
                            </div>
                            <div className="card-footer border-0 delimiter-top">
                                    <div className="row align-items-center">
                                        <div className="col-auto">
                                            <span className="text-sm mb-0 avatar-content">27 Jan, 2022</span>
                                        </div>
                                        <div className="col text-right text-right">
                                            <FileDownloadDoneOutlinedIcon sx={{ mr:.6, width: 20 }} />
                                            <span>350</span>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
            : 
            <Card sx={{  boxShadow: "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px", my: 3, p:3 }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant={isDesktop ? "h4" : "h5"} sx={{ mb:4, textAlign: "center" }}>You have no courses in your library!</Typography>
                        <Link to="/"><Button size="large" variant="contained">Explore Courses</Button></Link>
                    </CardContent>
                </Card>
            }
            
            </Container>
        </React.Fragment>
    )
}

export default UserCourses