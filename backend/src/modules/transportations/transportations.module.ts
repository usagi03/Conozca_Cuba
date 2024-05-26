import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transportation } from "./transportation.entity";
import { TransportationsService } from "./service/transportations.service";
import { TransportationsController } from "./controller/transportations.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Transportation])],
  controllers: [TransportationsController],
  providers: [TransportationsService],
})
export class TransportationsModule {}
