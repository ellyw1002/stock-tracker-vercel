// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseButton from '@mui/icons-material/CancelOutlined';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function ScreenshotModal(props) {
  const { base64, isLoading } = props;
  const imgSource = `data:image/png;base64, ${base64}`;
  const image = (!isLoading && base64) ? <img width="100%" src={imgSource} /> :
    <Alert severity="error">No Screenshot</Alert>;

  return (
    <Dialog
      {...props}
      fullWidth
      maxWidth="xl"
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Box minHeight="15px" height="15px" display="flex" alignItems="center">
          <Box flexGrow={1} ></Box>
          <Box>
            <IconButton onClick={props.onClose}>
              <CloseButton />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {isLoading ? <CircularProgress color="inherit" size={20} /> :
          (<DialogContentText minHeight="50px" id="alert-dialog-slide-description">
        {image}
          </DialogContentText>)
        }
      </DialogContent>
    </Dialog>
  );
}

// export default function ScreenshotModal(props) {
//   const { base64 } = props;
//   const imgSource = `data:image/png;base64, ${base64}`;
//   const image = base64 ? <img src={imgSource} className="img-fluid" /> : <div>No Screenshot</div>
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       dialogClassName="modal-90w"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//       </Modal.Header>
//       <Modal.Body>
//         {image}
//       </Modal.Body>
//     </Modal>
//   );
// }