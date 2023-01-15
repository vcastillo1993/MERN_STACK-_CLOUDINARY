import { connectDB } from './db.js';
import { PORT } from './cofig.js';
import app from './app.js'

connectDB()
app.listen(PORT)
console.log('server in running port', PORT);
