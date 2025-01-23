const express = require('express');

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

app.use((req, res) => {
  res.status(404).send('Not found');
});

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

module.exports = app;
