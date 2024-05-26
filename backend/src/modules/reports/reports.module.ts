import { Module } from "@nestjs/common";
import { ReportsService } from "./reports/reports.service";
import { ReportsController } from "./reports/reports.controller";
import { HotelsService } from "../hotels/service/hotels.service";
import { PackagesService } from "../packages/service/packages.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotel } from "../hotels/hotels.entity";
import { Package } from "../packages/package.entity";
import { Contract } from "../contracts/contract.entity";
import { Daily_activity } from "../activities/activities.entity";
import { Meal_plan } from "../meal_plans/plans.entity";
import { Acommodation } from "../acommodations/acommodations.entity";
import { Room } from "../rooms/rooms.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hotel,
      Package,
      Contract,
      Daily_activity,
      Meal_plan,
      Acommodation,
      Room,
    ]),
  ],
  providers: [ReportsService, HotelsService, PackagesService],
  controllers: [ReportsController],
})
export class ReportsModule {}
