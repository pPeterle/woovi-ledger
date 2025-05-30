import http from "http";

import { config } from "./config";
import { connectDatabase } from "./db/database";
import { app } from "./server/app";

(async () => {
  await connectDatabase();

  const server = http.createServer(app.callback());

  server.listen(config.PORT, () => {
    // eslint-disable-next-line
    console.log(`Server running on port:${config.PORT}`);
  });
})();
