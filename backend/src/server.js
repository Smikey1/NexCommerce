import app from "./app.js";
import { connectDB } from "./config/db.js";
import { Env } from "./shared/env/env.js";

const PORT = Env.PORT;
try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
} catch (err) {
    console.error('❌ Could not connect to DB:', err.message);
    process.exit(1);
}