const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://novaspace-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the NovaSpace Backend!');
});

app.use('/api', apiRoutes);
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;