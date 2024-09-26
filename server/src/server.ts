import express from "express"
import {config} from "dotenv"
config()

const app = express();

const PORT = process.env.BACKEND_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});