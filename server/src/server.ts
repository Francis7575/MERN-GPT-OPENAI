import app from "./app";
import { connectToDatabase } from "./db/connection"
const PORT = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT} & Connected To MongoDB`));
  })
  .catch((err) => console.log(err));
