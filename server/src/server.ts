import app from "./app";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 6000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server is running on port 6000 & Connected To MongoDB"));
  })
  .catch((err) => console.log(err));
