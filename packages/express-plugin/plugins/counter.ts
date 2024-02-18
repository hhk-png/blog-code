import fs from 'fs';
// import { App } from '../server/server.js';

let count: number = 0;

export function load(app: any) {
  try {
    count += parseInt(fs.readFileSync('./counter.txt', 'utf8'));
  } catch(e) {
    console.log('No counter file found');
  }
  app.server.use((req, res, next) => {
    count++;
    next();
  });
  app.server.get('/count', (req, res) => {
    res.send(`Counter: ${count}`);
  });
}

export function unload() {
  fs.writeFileSync('./counter.txt', count + "");
}

