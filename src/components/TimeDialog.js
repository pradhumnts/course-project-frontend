import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom'

export default function AlertDialog({ dialogOpen, finshTestHandler }) {
  const [open, setOpen] = React.useState(dialogOpen);

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
          <Button onClick={() => finshTestHandler(handleClose)}>See results</Button>
          <Link to="/">
          <Button onClick={handleClose}>
            Go to homepage
          </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
