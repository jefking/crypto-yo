const express = require('express');
const bodyParser = require('body-parser');
const CryptoController = require('./Controllers/cryptoController');

require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  serveOptions: {
    index: 'index.htm',
  },
};

const app = express();
app.use(bodyParser.json());
app.use('/', express.static('public', config.serveOptions));
app.disable('x-powered-by');

// const apiKey = '';
// // Function to call the API
// async function fetchData() {
//   try {
//     const response = await axios.get('https://api.example.com/data'); // Replace with your API URL
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the function
// fetchData();
const cryptoController = new CryptoController();
const apiRouter = express.Router();
apiRouter.get('/crypto', cryptoController.get);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Not found');
});

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

module.exports = app;
