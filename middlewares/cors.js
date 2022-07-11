const cors = require('cors');

const allowedCors = {
  origin: [
    'https://novo.nomoredomains.xyz',
    'http://novo.nomoredomains.xyz',
    'localhost:3000',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
