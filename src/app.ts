import express from 'express';
import config from '../config';
import PassportAuthentication from './providers/PassportAuthentication';
import session from 'express-session';
import { estabilishDatabase } from './providers/DatabaseProvider';
const app = express();

/* Global middlewares */

app.use(session({secret: config.SESSION_SECRET, saveUninitialized: false, resave: false}))
app.use(PassportAuthentication.initialize());
app.use(PassportAuthentication.session());
estabilishDatabase(config.DATABASE_URI);

/* Routes */

import Authentication from './routes/Authentication';
app.use('/auth/', Authentication);

app.listen(config.PORT, () => console.log('Webserver is ready!'))