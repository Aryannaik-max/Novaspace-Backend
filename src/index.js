const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://novaspace-seven.vercel.app",
    process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : null
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the NovaSpace Backend!');
});

app.use('/api', apiRoutes);
  
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;