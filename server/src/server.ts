import * as winston from 'winston';
import App from "./App";
import { SERVER_PORT, SERVER_HOST } from './env';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/logfile.log' })
    ]
});

App.listen(SERVER_PORT, () => {
    logger.log('info', `Server Port: ${SERVER_PORT}`);
    logger.log('info', `Server URL: http://${SERVER_HOST}:${SERVER_PORT}`);
});