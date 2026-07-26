import { startConsumers } from "./consumers/start-consumer.js";
import { connectRabbitMQ } from "./rabbitmq/connection.js";
import { createExchanges } from "./rabbitmq/exchange.js";

await createExchanges();
await startConsumers();