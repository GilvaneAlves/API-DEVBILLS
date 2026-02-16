import app from "./app.js";

const PORT = 3001;

const startServer = async () => {
    try {
        await app.listen({ port: 3001 }).then(() => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1);
    }
}

startServer();