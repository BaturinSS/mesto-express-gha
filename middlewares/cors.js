const cors = require('cors');

const whitelist = [
  'https://novo.nomoredomains.xyz',
  'http://novo.nomoredomains.xyz',
  'localhost:3000',
];

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(corsOptions);
