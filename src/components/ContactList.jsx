import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import AddContactForm from './AddContactForm';
import { contactService } from '../services/contactService';
import SkeletonCard from './SkeletonCard';
import Toast from './Toast';
import ConnectionStatus from './ConnectionStatus';
import ThemeToggle from './ThemeToggle';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    setIsLoading(true);
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const serverData = await contactService.getContactsFromServer();
      if (Array.isArray(serverData)) {
        setContacts(serverData);
        setFilteredContacts(serverData);
      }
    } catch (error) {
      console.error('Error loading contacts from server:', error);
      const local = contactService.getLocalContacts();
      setContacts(local);
      setFilteredContacts(local);
      setToast('Using local contacts (server unreachable)');
      setTimeout(() => setToast(''), 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredContacts(contacts);
      return;
    }
    try {
      const data = await contactService.getContacts(term.trim());
      setFilteredContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Search error', err);
      setToast('Search failed — check server connection.');
      setTimeout(() => setToast(''), 2500);
    }
  };

  const handleAddContact = async (newContactData) => {
    try {
      const created = await contactService.addContact(newContactData);

      await loadContacts();

      setToast(`Added ${created.name} to your contacts`);
      setTimeout(() => setToast(''), 2200);
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.status === 409) {
        setToast(error.message || 'Duplicate contact');
        setTimeout(() => setToast(''), 2200);
      }
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await contactService.deleteContact(id);
      await loadContacts();
      setToast('Contact deleted successfully');
      setTimeout(() => setToast(''), 2200);
    } catch (error) {
      console.error('Error deleting contact:', error);
      setToast('Failed to delete contact');
      setTimeout(() => setToast(''), 2200);
    }
  };

  return (
    <div className="contact-list-container">
      <ThemeToggle />
      <motion.header className="header" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="header-content">
          <motion.h1 layoutId="title" transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
            <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Contact List
          </motion.h1>
          <motion.p className="subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} in total
          </motion.p>
          <ConnectionStatus onSync={loadContacts} />
        </div>
      </motion.header>

      <div className="content">
        <Toast message={toast} onClose={() => setToast('')} />
        <AddContactForm onAddContact={handleAddContact} />
        <SearchBar onSearch={handleSearch} />

        {isLoading ? (
          <div className="contacts-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="empty-state">
            <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {contacts.length === 0 ? (
              <>
                <h3>No contacts in database</h3>
                <p>Start by adding your first contact</p>
              </>
            ) : (
              <>
                <h3>No contacts found</h3>
                <p>{`No contacts match "${searchTerm}"`}</p>
              </>
            )}
          </div>
        ) : (
          <AnimatePresence>
            <div className="contacts-grid">
              {filteredContacts.map((contact) => {
                const key = contact._id || contact.id || contact.email || JSON.stringify(contact);
                const contactId = contact._id || contact.id;
                return (
                  <motion.div
                    key={key}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ContactCard
                      contact={contact}
                      onDelete={handleDeleteContact}
                    />
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ContactList;
