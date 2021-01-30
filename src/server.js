import 'dotenv/config.js';
import app from './app.js';

app.listen(process.env.EXPRESS_PORT);
