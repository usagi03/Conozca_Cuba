import { Module } from "@nestjs/common";
import { TransportationCoController } from "./transportation-co/transportation-co.controller";
import { TransportationSService } from "./transportation-s/transportation-s.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transportation } from "./transportation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Transportation])],
  controllers: [TransportationCoController],
  providers: [TransportationSService],
})
export class TransportationsModule {}
