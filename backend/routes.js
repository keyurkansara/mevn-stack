const express = require('express'),
  apiRoutes = express.Router(),
  ClientController = require('./controllers/ClientController'),
  ProviderController = require('./controllers/ProviderController');

apiRoutes.route('/').get((req, res, next) => {
  res.json({ message: "Hello" })
})

// clients
apiRoutes.get('/clients', ClientController.list);
apiRoutes.get('/client/:id', ClientController.get);
apiRoutes.post('/client', ClientController.create);
apiRoutes.put('/client/:id', ClientController.update);
apiRoutes.delete('/client/:id', ClientController.delete);

// providers
apiRoutes.get('/providers', ProviderController.list);
apiRoutes.get('/provider/:id', ProviderController.get);
apiRoutes.post('/provider', ProviderController.create);
apiRoutes.put('/provider/:id', ProviderController.update);
apiRoutes.delete('/provider/:id', ProviderController.delete);

module.exports = apiRoutes