import { initialContacts } from '../data/mockContacts';

const API_BASE = 'http://localhost:4000';
const LOCAL_KEY = 'contacts_local_v1';

const fromLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

const toLocal = (arr) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  } catch (e) {
    // ignore
  }
};

const checkServer = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const contactService = {
  getContacts: async (q = '') => {
    if (await checkServer()) {
      const url = new URL(`${API_BASE}/contacts`);
      if (q) url.searchParams.set('q', q);
      const res = await fetch(url.toString());
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to fetch contacts');
      }
      return res.json();
    }

    let local = fromLocal();
    if ((!local || !Array.isArray(local) || local.length === 0) && Array.isArray(initialContacts) && initialContacts.length > 0) {
      const seed = initialContacts.map(c => ({ ...c }));
      toLocal(seed);
      local = seed;
    }

    if (local && Array.isArray(local)) {
      if (!q) return local;
      return local.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
    }

    return Array.isArray(initialContacts) ? initialContacts : [];
  },

  getLocalContacts: () => {
    let local = fromLocal();
    if ((!local || !Array.isArray(local) || local.length === 0) && Array.isArray(initialContacts) && initialContacts.length > 0) {
      const seed = initialContacts.map(c => ({ ...c }));
      toLocal(seed);
      local = seed;
    }
    return local || (Array.isArray(initialContacts) ? initialContacts : []);
  },

  getContactsFromServer: async (q = '') => {
    const url = new URL(`${API_BASE}/contacts`);
    if (q) url.searchParams.set('q', q);
    const res = await fetch(url.toString());
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch contacts');
    }
    return res.json();
  },

  addContact: async (data) => {
    const local = fromLocal() || [];
    const newContact = {
      ...data,
      id: Date.now()
    };
    local.unshift(newContact);
    toLocal(local);

    if (await checkServer()) {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.status === 409) {
        const body = await res.json().catch(() => ({}));
        const message = body.error || 'Duplicate contact';
        const err = new Error(message);
        err.status = 409;
        err.details = body.existing || body.details;
        throw err;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to add contact');
      }
      return res.json();
    }

    return Promise.resolve(newContact);
  },

  deleteContact: async (id) => {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Failed to delete contact');
    }
    return res.json();
  },

  deleteMultiple: async (ids) => {
    const res = await fetch(`${API_BASE}/contacts/delete-multiple`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || 'Failed to delete contacts');
    }
    return res.json();
  }
};

export const serverAvailable = async () => {
  return await checkServer();
};
