import { createServer } from "http";
import app from "../src/index.js";

const server = createServer(app);

//App listens
const port = process.env.PORT || 8081;
server.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});
