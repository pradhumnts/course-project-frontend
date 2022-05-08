import React from 'react'
import NavBar from '../components/NavBar'
import Typography from '@mui/material/Typography'

const NotFoundPage = () => {
  return (
    <div>
        <NavBar />
        <Typography sx={{ mt:4, textAlign: 'center' }} variant="h3">404 - Page Not Fond</Typography>
    </div>
  )
}

export default NotFoundPage