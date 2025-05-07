import { createServer } from './app/server';

createServer(() => {
    console.info(`API is running on 5050`);
});
