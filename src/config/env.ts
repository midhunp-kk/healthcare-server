import dotenv from 'dotenv';

dotenv.config();

type EnvConfig = {
    MONGO_URI: string;
    PORT: string;
    JWT_KEY: string;
    ALLOW_ORIGINS: string[];
};

const parseOrigins = (origins: string | undefined): string[] => {
    return origins ? origins.split(',').map((origin) => origin.trim()) : [];
};

const ENV: EnvConfig = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: process.env.PORT || '3000',
    JWT_KEY: process.env.JWT_KEY || '',
    ALLOW_ORIGINS: parseOrigins(process.env.ALLOW_ORIGINS),
};

// Optional: Throw an error if critical env variables are missing (for server-side only vars)
if (!ENV.MONGO_URI) throw new Error('Missing environment variable: MONGO_URI');
if (!ENV.JWT_KEY) throw new Error('Missing jwt key');
if (!ENV.ALLOW_ORIGINS)
    throw new Error('Missing environment variable: ALLOW_ORIGINS');
export { ENV };