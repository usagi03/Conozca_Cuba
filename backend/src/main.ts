import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as config from "config";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);

 
    app.enableCors();
  

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const serverConfig = config.get("server");
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log("App is running on : ${port}");
}
bootstrap();
