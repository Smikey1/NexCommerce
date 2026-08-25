import morgan from "morgan";
import logger from "../config/logger.js";


export const httpLogger = morgan(
    "combined",
    {
        stream: {
            write: (message) => {
                logger.info(message.trim());
            }
        }
    }
);