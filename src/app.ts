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

/* Models initialisation */

import './models/Channel';
import './models/Guild';
import './models/Role';
import './models/User';

/* Routes */

import Authentication from './routes/Authentication';
app.use('/auth/', Authentication);

import Users from './routes/Users';
app.use('/users/', Users)

import Guilds from './routes/Guilds';
app.use('/guilds/', Guilds)

app.listen(config.PORT, () => console.log('Webserver is ready!'))