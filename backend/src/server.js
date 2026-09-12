import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startConsumers } from "./messaging/consumers/start-consumer.js";
import { connectRabbitMQ } from "./messaging/rabbitmq/connection.js";
import { createExchanges } from "./messaging/rabbitmq/exchange.js";
import { Env } from "./shared/env/env.js";

const PORT = Env.PORT;
try {
    await connectDB();
    await connectRabbitMQ()
    await createExchanges()
    // await startConsumers()

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
} catch (err) {
    console.error('❌ Could not connect to DB:', err.message);
    process.exit(1);
}