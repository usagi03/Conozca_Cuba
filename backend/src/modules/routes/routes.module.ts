import { Module } from "@nestjs/common";
import { RouteCoController } from "./controller/routes.controller";
import { RouteSService } from "./service/routes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "./route.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [RouteCoController],
  providers: [RouteSService],
})
export class RoutesModule {}
