import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ dialogOpen }) {
  const [open, setOpen] = React.useState(dialogOpen);

    //   const handleClickOpen = () => {
    //     setOpen(true);
    //   };

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
          {"Time's Over!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Test timing is over. You can start again if you would like!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>See results</Button>
          <Button onClick={handleClose}>
            Go to homepage
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}