export const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "JD"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "JS"
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "AJ"
  },
  {
    id: 4,
    name: "Bob Williams",
    email: "bob.williams@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "BW"
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "CB"
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "DP"
  },
  {
    id: 7,
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "EH"
  },
  {
    id: 8,
    name: "Fiona Green",
    email: "fiona.green@example.com",
    phone: "+1 (555) 890-1234",
    avatar: "FG"
  }
];

export const contactAPI = {
  getAllContacts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...initialContacts];
  },

  searchContacts: async (searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return initialContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  addContact: async (newContact) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const contact = {
      ...newContact,
      id: Date.now(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newContact.name)}&background=random&color=fff`
    };
    return contact;
  }
};
