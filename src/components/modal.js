import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ScreenshotModal(props) {
  const { base64 } = props;
  const imgSource = `data:image/png;base64, ${base64}`;
  return (
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <img src={imgSource} className="img-fluid" />
      </Modal.Body>
    </Modal>
  );
}