// swaggerDoc.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PassportVault API',
      description: 'PassportVault API Information',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js', './routes/*.yml'], // path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;