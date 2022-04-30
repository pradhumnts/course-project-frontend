import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';

export default function AlertDialog({ timeSpent, correct, incorrect, unanswerd }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Test Results"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ width: "30vw", px: 3 }}>
           
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography sx={{ fontWeight: 'bold' }}>Time Spent </Typography>
                <Typography variant="p">{timeSpent}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography sx={{ fontWeight: 'bold' }}>Correct Questions</Typography>
                <Typography variant="p">{correct}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
                <Typography sx={{ fontWeight: 'bold' }}>Incorrect Questions</Typography>
                <Typography variant="p">{incorrect}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',}}>
                <Typography sx={{ fontWeight: 'bold' }}>Unanswerd Questions</Typography>
                <Typography variant="p">{unanswerd}</Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Go To Homepage
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
