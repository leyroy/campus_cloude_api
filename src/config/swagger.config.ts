import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';


// Read all schema files from the schemas folder
const schemasDir = path.join(__dirname, '../docs');

const schemaFiles = fs.readdirSync(schemasDir).filter(file => file.endsWith('.json'));

const schemas: Record<string, any> = {};

for (const file of schemaFiles) {
  const content = JSON.parse(
    fs.readFileSync(path.join(schemasDir, file), 'utf-8')
  );

  Object.assign(schemas, content);
}
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
      schemas,
    },
  },
  apis: [
    './src/docs/**/*.ts',
    './src/docs/**/*.json',
    './src/docs/**/*.ts',    // Include schema definitions
    './src/routes/**/*.ts',  
    path.join(__dirname, '../routes/**/*.ts')       // Include route definitions
  ],
};

const specs = swaggerJsdoc(swaggerOptions);
export default specs;