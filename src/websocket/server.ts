import { Server } from "socket.io";
import config from "../../config";

export class WSServer {
  public readonly server = new Server();
  constructor(app: any) {
    this.server.listen(app, {
      cors: { origin: config.CORS_DOMAIN },
      path: "/ws",
    });
    this.hook();
  }
  private hook() {
    this.server.on("connection", (client) => {
      client.emit("connected");
    });
  }
}
