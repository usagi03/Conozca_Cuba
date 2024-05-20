import { Module } from "@nestjs/common";
import { KmControlerController } from "./km_controler/km_controler.controller";
import { KmServiceService } from "./km_service/km_service.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Km_cost } from "./km.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Km_cost])],
  controllers: [KmControlerController],
  providers: [KmServiceService],
})
export class KmCostsModule {}
