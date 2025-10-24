import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AddContactForm.css';

const AddContactForm = ({ onAddContact }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhoneNumber(formData.phone.trim())) {
      newErrors.phone = 'Phone number is invalid (e.g., +1 (555) 123-4567 or 10-15 digits)';
    }
    
    return newErrors;
  };

  const isValidPhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let avatarUrl = '';
    if (file) {
      try {
        const fd = new FormData();
        fd.append('avatar', file);
        const res = await fetch('http://localhost:4000/upload', { method: 'POST', body: fd });
        if (res.ok) {
          const body = await res.json();
          avatarUrl = body.url;
        } else {
          console.warn('Avatar upload returned non-OK status, using initials');
        }
      } catch (err) {
        console.error('Avatar upload failed', err);
      }
    }

    if (!avatarUrl) {
      const names = formData.name.trim().split(' ');
      const initials = names
        .slice(0, 2)
        .map(n => n.charAt(0).toUpperCase())
        .join('');
      avatarUrl = initials || 'U';
    }

    await onAddContact({ ...formData, avatar: avatarUrl });
    setFormData({ name: '', email: '', phone: '' });
    setFile(null);
    setErrors({});
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFile(f || null);
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' });
    setFile(null);
    setErrors({});
    setIsFormOpen(false);
  };

  return (
    <div className="add-contact-form">
      {!isFormOpen ? (
        <motion.button
          onClick={() => setIsFormOpen(true)}
          className="add-contact-button"
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Contact
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.form
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <h3>Add New Contact</h3>
          
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Enter email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar (optional)</label>
              <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} />
              <small className="muted">Optional profile picture. If omitted, a default avatar will be used.</small>
            </div>

            <div className="form-actions">
              <motion.button type="button" onClick={handleCancel} className="cancel-button" whileTap={{ scale: 0.98 }}>
                Cancel
              </motion.button>
              <motion.button type="submit" className="submit-button" whileTap={{ scale: 0.98 }}>
                Add Contact
              </motion.button>
            </div>
          </motion.form>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AddContactForm;
