import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { merge } from 'lodash';

// Load individual YAML files
const loadYaml = (file: string) => YAML.load(path.join(__dirname, `../../docs/swagger/${file}.yaml`));

const loadSwaggerSpec = () => {
  try {
    const baseSpec = loadYaml('base');
    const authPaths = loadYaml('auth').paths;
    const userPaths = loadYaml('user').paths;
    
    return merge({}, baseSpec, {
      paths: {
        ...authPaths,
        ...userPaths
      }
    });
  } catch (error) {
    throw new Error(`Failed to load Swagger spec: ${error.message}`);
  }
};

export const setupSwagger = (app: Express): void => {
  const swaggerSpec = loadSwaggerSpec();
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve);
  
  // JSON endpoint
  app.get('/api-docs.json', (_, res) => {
    res.json(swaggerSpec);
  });
  
  // Swagger UI
  app.use('/api-docs', swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      validatorUrl: null
    }
  }));
};