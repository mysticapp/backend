import express from 'express';
import config from '../config';
const app = express();

/* Routes */

import Authentication from './routes/Authentication';
app.use('/auth/', Authentication);

app.listen(config.PORT, () => console.log('Webserver is ready!'))