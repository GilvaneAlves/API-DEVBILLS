import "dotenv/config"; // 🔥 carrega antes de tudo

import app from "./app.js";
import { prismaConnect } from "./config/prisma.js";
import { initializeGlobalCategories } from "./services/globalCategories.service.js";

const PORT = Number(process.env.PORT || 3001);

const startServer = async () => {
  try {
    
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: PORT });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();