// vendorlink-backend/index.js

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001
const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vendorlink', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// === MongoDB Schemas ===
const mongoose = require('mongoose');

// ==================== User Schema ====================
const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  name: { type: String },
  businessName: { type: String },
  location: { type: String },
  category: { type: String },
  type: { type: String, enum: ['vendor', 'supplier'], required: true },
  rating: { type: Number, default: 4 },
  verified: { type: Boolean, default: false },
  trustScore: { type: Number, default: 80 },
  joinedDate: { type: Date, default: Date.now }
});

// ==================== Item Schema ====================
const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String },
  minQty: { type: Number },
  stock: { type: String, enum: ['High', 'Medium', 'Low'] }
});

// ==================== Supplier Schema (extends User) ====================
const SupplierSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  verified: Boolean,
  minOrder: Number,
  deliveryTime: String,
  speciality: String,
  trustScore: Number,
  responseTime: String,
  products: [ItemSchema]
});

// ==================== Order Schema ====================
const OrderSchema = new mongoose.Schema({
  vendor: { type: String },     // For supplier's view
  supplier: { type: String },   // For vendor's view
  items: [{
    name: String,
    qty: Number,
    unit: String,
    price: Number,
    rate: Number
  }],
  total: { type: Number },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  orderDate: { type: Date, default: Date.now },
  deliveryTime: String,
  estimatedDelivery: String,
  deliveredAt: String,
  trackingSteps: [{
    step: String,
    completed: Boolean,
    time: String
  }]
});

// ==================== Chat Schema ====================
const ChatSchema = new mongoose.Schema({
  from: { type: String },
  to: { type: String },
  message: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// ==================== Export Models ====================


module.exports = {
  User,
  Supplier,
  Item,
  Order,
  Chat
};


const User = mongoose.model('User', UserSchema)
const Item = mongoose.model('Item', ItemSchema)
const Order = mongoose.model('Order', OrderSchema)
const Chat = mongoose.model('Chat', ChatSchema)

// === Auth Middleware ===
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
}

// === Routes ===

// Register (for test/demo)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body
  const user = new User({ email, password })
  await user.save()
  res.status(201).json({ success: true })
})

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ success: true, token })
})

// Profile
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ email: req.user.email, name: 'Vendor User' })
})

// Marketplace
app.get('/api/marketplace', async (req, res) => {
  const items = await Item.find()
  res.json(items)
})

// Orders
app.get('/api/orders', authenticate, async (req, res) => {
  const orders = await Order.find()
  res.json(orders)
})

app.post('/api/orders', authenticate, async (req, res) => {
  const order = new Order(req.body)
  await order.save()
  res.status(201).json(order)
})

// Chat
app.get('/api/chat', authenticate, async (req, res) => {
  const messages = await Chat.find()
  res.json(messages)
})

app.post('/api/chat', authenticate, async (req, res) => {
  const message = new Chat(req.body)
  await message.save()
  res.status(201).json(message)
})

// Root
app.get('/', (req, res) => res.send('VendorLink Backend with MongoDB & JWT'))
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
