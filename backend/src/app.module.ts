import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AccommodationModule } from './modules/accommodation/accommodation.module';
import { TransportationModule } from './modules/transportation/transportation.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [UsersModule, AccommodationModule, TransportationModule, ActivitiesModule, ContractsModule, PackagesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
