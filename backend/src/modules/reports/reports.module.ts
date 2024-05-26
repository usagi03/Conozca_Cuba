import { Module } from "@nestjs/common";
import { ReportsService } from "./reports/reports.service";
import { ReportsController } from "./reports/reports.controller";
import { HotelsService } from "../hotels/service/hotels.service";
import { HotelsModule } from "../hotels/hotels.module";

@Module({
  imports: [HotelsModule],
  providers: [ReportsService, HotelsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
