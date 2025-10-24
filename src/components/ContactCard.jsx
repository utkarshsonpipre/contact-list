import { motion } from 'framer-motion';
import { useState } from 'react';
import './ContactCard.css';

const ContactCard = ({ contact, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isUrl = contact.avatar && (contact.avatar.startsWith('http') || contact.avatar.startsWith('/'));

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(contact._id || contact.id);
    }
    setShowModal(false);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <motion.div
        className="contact-card"
        onClick={() => setShowModal(true)}
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-header">
          {isUrl ? (
            <img src={contact.avatar} alt={contact.name} className="avatar" />
          ) : (
            <div className="avatar avatar-initials">
              {contact.avatar || 'U'}
            </div>
          )}
        </div>
        
        <div className="card-body">
          <h3 className="contact-name">{contact.name}</h3>
          <div className="contact-info">
            <div className="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>{contact.email}</span>
            </div>
            <div className="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.92 7.02C17.45 6.18 16.51 5.55 15.43 5.55c-1.08 0-2.02.63-2.49 1.47C12.04 5.55 10.81 4.9 9.49 4.9c-1.84 0-3.45 1.22-4.12 2.88-.23.59-.35 1.23-.35 1.9v9.2c0 .78.09 1.56.29 2.3.3 1.08 1.36 1.88 2.6 1.88 1.24 0 2.3-.8 2.6-1.88.2-.74.29-1.52.29-2.3v-4.5c0-.78.09-1.56.29-2.3.3-1.08 1.36-1.88 2.6-1.88s2.3.8 2.6 1.88c.2.74.29 1.52.29 2.3v4.5c0 .78.09 1.56.29 2.3.3 1.08 1.36 1.88 2.6 1.88 1.24 0 2.3-.8 2.6-1.88.2-.74.29-1.52.29-2.3V9.82c0-.67-.12-1.31-.35-1.9z" />
              </svg>
              <span>{contact.phone}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="modal-header">
              {isUrl ? (
                <img src={contact.avatar} alt={contact.name} className="modal-avatar" />
              ) : (
                <div className="modal-avatar avatar-initials">
                  {contact.avatar || 'U'}
                </div>
              )}
            </div>

            <div className="modal-body">
              <h2>{contact.name}</h2>

              <div className="modal-details">
                <div className="detail-item">
                  <label>Email</label>
                  <p>{contact.email}</p>
                  <a href={`mailto:${contact.email}`} className="action-link">
                    Send Email
                  </a>
                </div>

                <div className="detail-item">
                  <label>Phone</label>
                  <p>{contact.phone}</p>
                  <a href={`tel:${contact.phone}`} className="action-link">
                    Call Now
                  </a>
                </div>
              </div>

              <div className="modal-actions">
                {!showDeleteConfirm ? (
                  <>
                    <motion.button
                      className="btn-secondary"
                      onClick={() => setShowModal(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                    <motion.button
                      className="btn-danger"
                      onClick={() => setShowDeleteConfirm(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                      </svg>
                      Delete Contact
                    </motion.button>
                  </>
                ) : (
                  <div className="delete-confirm">
                    <p>Are you sure you want to delete <strong>{contact.name}</strong>?</p>
                    <div className="confirm-buttons">
                      <motion.button
                        className="btn-secondary"
                        onClick={() => setShowDeleteConfirm(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        className="btn-danger"
                        onClick={handleDelete}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Delete Permanently
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default ContactCard;
