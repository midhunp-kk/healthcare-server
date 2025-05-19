import { app } from '@/app';
import connectDB from './src/config/db';
import { ENV } from './src/config/env';

(async function start() {
    await connectDB();
    app.listen(ENV.PORT, () => console.log(`✅ Listenting to port ${ENV.PORT}!`));
})();