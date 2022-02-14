import express from 'express';
import config from '../config';
import { estabilishDatabase } from './providers/DatabaseProvider';
import passport from './providers/AuthenticationProvider'
import cookieParser from 'cookie-parser';
import session from 'cookie-session';
const app = express();

/* Global middlewares */

estabilishDatabase(config.DATABASE_URI);
app.use(express.json())
app.use(session({secret: config.SESSION_SECRET, maxAge: 24*60*60*1000, name: 'session'}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());


/* Routes */

import Authentication from './routes/Authentication';
app.use('/auth/', Authentication);

app.listen(config.PORT, () => console.log('Webserver is ready!'))