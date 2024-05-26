import { Module } from "@nestjs/common";
import { ReportsService } from "./reports/reports.service";
import { ReportsController } from "./reports/reports.controller";
import { HotelsService } from "../hotels/service/hotels.service";
<<<<<<< HEAD
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
=======
import { HotelsModule } from "../hotels/hotels.module";

@Module({
  imports: [HotelsModule],
  providers: [ReportsService, HotelsService],
>>>>>>> 51bd6f69616ecb569ce01cbd37e1f63d77a47fe5
  controllers: [ReportsController],
})
export class ReportsModule {}
