import {app} from './app.js';

const port: number = Number(process.env.PORT || 3001);

app.listen(port, () => console.log(`Order Bridge listening on http://localhost:${port}`))