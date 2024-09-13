import React from 'react';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ErrorImage from '../assets/images/error.jpg';
import SuccessImage from '../assets/images/success1.jpg';

const FeedbackModal = ({ show, handleClose, type, message }) => {
  const icon = type === 'error' ? faExclamationTriangle : faCheckCircle;
  const modalColor = type === 'error' ? 'error-bg' : 'success-bg';

  return (
    <Modal show={show} handleClose={handleClose} title={type === 'error' ? 'Something went wrong' : 'Success'}>
      <div className={`feedback-modal ${modalColor}`}>
        <FontAwesomeIcon icon={icon} className="feedback-icon" />
        <p className="feedback-message">{message}</p>

        {/* Placeholder image for success or error */}
        <div className="image-placeholder">
          {type === 'error' ? (
            <img src={ErrorImage} alt="Error" />
          ) : (
            <img src={SuccessImage} alt="Success" />
          )}
        </div>

        <button onClick={handleClose} className="feedback-button">Close</button>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
