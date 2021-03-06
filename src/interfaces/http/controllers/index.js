const swaggerJSDoc = require('swagger-jsdoc')
const { Router } = require('express')

module.exports = () => {
  const router = Router();

  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'API Explorer',
      version: '1.0.0',
      description: 'Available REST Endpoints of RESTful API'
    },
    host: `localhost:3250`,
    basePath: '/api/v1',
    schemes: ['http'],
    securityDefinitions: {
      Bearer: {
        description: '',
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  }

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['src/interfaces/http/controllers/**/*.js']
  }

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options)
  /**
   * @swagger
   * responses:
   *   Unauthorized:
   *     description: Unauthorized
   *   BadRequest:
   *     description: BadRequest / Invalid Input
   */
  router.get('/', (req, res) => {
    return res.json({status: 'API working'})
  })

  router.get('/swagger.json', (req, res) => {
    return res.json(swaggerSpec)
  })

  return router
}