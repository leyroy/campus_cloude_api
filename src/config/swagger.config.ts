import swaggerJsdoc from 'swagger-jsdoc';
import '../docs/users';
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
    },
  },
  apis: [
    './src/docs/**/*.ts',
    './src/docs/**/*.json',
    './src/docs/**/*.ts',    // Include schema definitions
    './src/routes/**/*.ts',         // Include route definitions
  ],
};

const specs = swaggerJsdoc(swaggerOptions);
export default specs;