const config = require('../config');
const app = require('../')();

app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`));
