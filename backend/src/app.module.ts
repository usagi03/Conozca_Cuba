import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcommodationsModule } from "./modules/acommodations/acommodations.module";
import { ActivitiesModule } from "./modules/activities/activities.module";
import { ContractsModule } from "./modules/contracts/contracts.module";
import { HotelsModule } from "./modules/hotels/hotels.module";
import { KmCostsModule } from "./modules/km_costs/km_costs.module";
import { KmHourCostsModule } from "./modules/km_hour_costs/km_hour_costs.module";
import { MealPlansModule } from "./modules/meal_plans/meal_plans.module";
import { PackagesModule } from "./modules/packages/packages.module";
//import { ReportsModule } from "./modules/reports/reports.module";
import { RolesModule } from "./modules/roles/roles.module";
import { RoomsModule } from "./modules/rooms/rooms.module";
import { RoutesModule } from "./modules/routes/routes.module";
import { TransportationModelsModule } from "./modules/transportation_models/transportation_models.module";
import { TransportationsModule } from "./modules/transportations/transportations.module";
import { UsersModule } from "./modules/users/users.module";
import { VehiclesModule } from "./modules/vehicles/vehicles.module";
import { AuthModule } from "./modules/auth/auth.module";
import { SeasonsModule } from "./modules/seasons/seasons.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: "postgres",
      password: "CamilaBD",
      database: "Conozca_Cuba",
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AcommodationsModule,
    ActivitiesModule,
    ContractsModule,
    HotelsModule,
    KmCostsModule,
    KmHourCostsModule,
    MealPlansModule,
    PackagesModule,
    //ReportsModule,
    RolesModule,
    RoomsModule,
    SeasonsModule,
    RoutesModule,
    TransportationModelsModule,
    TransportationsModule,
    UsersModule,
    VehiclesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
