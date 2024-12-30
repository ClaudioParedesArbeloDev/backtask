import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task API',
            version: '1.0.0',
            description: 'Task API', 
            contact: {
                name: 'Claudio Paredes Arbelo',
                email: 'claudioparedesarbelo@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Localhost',
            },
        ],
    },
    apis: ['./swagger/swagger.yml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;