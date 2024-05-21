import { Module } from "@nestjs/common";
import { RouteCoController } from "./route_co/route_co.controller";
import { RouteSService } from "./route_s/route_s.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "./route.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  controllers: [RouteCoController],
  providers: [RouteSService],
})
export class RoutesModule {}
