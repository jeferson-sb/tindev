const app = require('./app');
const config = require('./config');

app.listen(config.port, () =>
  console.log(
    `Server is up and running in ${config.mode} mode on http://localhost:${config.port}`
  )
);
