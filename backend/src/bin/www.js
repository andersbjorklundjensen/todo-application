
const config  = require('../config'),
      app     = require('../')();

app.listen(config.PORT, () => console.log('Server listening on port ' + config.PORT));