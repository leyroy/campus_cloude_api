import swaggerJsdoc from 'swagger-jsdoc';
import schemas from '../prisma/schemas/json-schema.json';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API aka Campus Cloude',
      description: 'API documentation for the School Management System',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: schemas.definitions,
    },
  },
  apis: [
    './src/docs/**/*.ts',
    './src/docs/**/*.json',
    './src/prisma/**/*.json',
    './src/docs/**/*.ts', // Include schema definitions
    './src/routes/**/*.ts',
  ],
};

const specs = swaggerJsdoc(swaggerOptions);
export default specs;
