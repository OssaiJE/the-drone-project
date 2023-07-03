import path from 'path';
import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'The Drone Project API.',
    version: '1.0.0',
    description: 'This is the full documentation of the The Drone Project API Version 1.' // Short description of the app
  },
  servers: [{ url: '/api/v1' }]
};

const dir = path.join(__dirname, '../../docs', '/');

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${dir}/**/*.yaml`]
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
