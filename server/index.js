import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import streamifier from 'streamifier';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const upload = multer();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not found in environment');
  process.exit(1);
}

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    avatar: { type: String }
  },
  { timestamps: true }
);

contactSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true } } });
contactSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $exists: true } } });

const Contact = mongoose.model('Contact', contactSchema);

app.get('/contacts', async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } }
          ]
        }
      : {};

    const docs = await Contact.find(filter).sort({ createdAt: -1 }).limit(100).lean();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'name, email and phone are required' });
    }

    const emailNorm = String(email).toLowerCase().trim();
    const phoneNorm = String(phone).trim();

    const existing = await Contact.findOne({ $or: [{ email: emailNorm }, { phone: phoneNorm }] }).lean();
    if (existing) {
      return res.status(409).json({ error: 'Contact with this email or phone already exists', existing });
    }

    const doc = await Contact.create({ name: name.trim(), email: emailNorm, phone: phoneNorm, avatar });
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate key error', details: err.keyValue });
    }
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

app.post('/upload', upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    return res.status(500).json({ error: 'Cloudinary not configured on server' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
        { folder: 'contact_list_app' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    });

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error', err);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Contact.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted', contact: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

app.post('/contacts/delete-multiple', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required and must not be empty' });
    }
    const result = await Contact.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Contacts deleted', deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete contacts' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
