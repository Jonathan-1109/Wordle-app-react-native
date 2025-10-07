import appConfig from "./src/middleware/config_middleware.js";
import express from "express"
import getConnection from "./src/config/db.js"

import usersRoutes from "./src/routes/users.routes.js"
import dataRoutes from "./src/routes/data.routes.js"
import { PORT } from "./src/config/config_env.js";

const app = express()
appConfig(app)

app.use('/api/users', usersRoutes)
app.use('/api/data', dataRoutes)

app.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});

await getConnection();
