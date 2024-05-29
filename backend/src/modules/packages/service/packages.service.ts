import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Package } from "../package.entity";
import { CreatePackageDto } from "../dtos/create-package.dto";
import { UpdatePackageDto } from "../dtos/update-package.dto";
import { Contract } from "src/modules/contracts/contract.entity";
import { Daily_activity } from "src/modules/activities/activities.entity";
import { Hotel } from "src/modules/hotels/hotels.entity";
import { Room } from "src/modules/rooms/rooms.entity";
import { Meal_plan } from "src/modules/meal_plans/plans.entity";
import { Acommodation } from "src/modules/acommodations/acommodations.entity";

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

  async getPackages(): Promise<Package[]> {
    return await this.packageRepository.find({ relations: ["contract"] });
  }

  async getPackage(id: number): Promise<Package> {
    console.log(id);
    const pack = await this.packageRepository.findOne({
      relations: ["contract"],
      where: { id_package: id },
    } as FindOneOptions<Package>);
    console.log(pack);

    if (!pack) {
      throw new NotFoundException("Resource not found");
    }

    return pack;
  }

  async createPackage(newPackage: CreatePackageDto): Promise<Package> {
    const contract = await this.validateContract(newPackage.contract);
    return await this.packageRepository.save({
      ...newPackage,
      contract: contract,
    });
  }

  async updatePackage(id_package: number, newPackage: UpdatePackageDto) {
    let ok = "Package could not be updated";
    const affectedRows = await this.packageRepository.update(id_package, {
      ...newPackage,
      contract: newPackage.contract
        ? await this.validateContract(newPackage.contract)
        : undefined,
    });

    if (affectedRows.affected > 0) {
      ok = "Contract updated successfully";
    }
    return ok;
  }

  async removePackage(id: number): Promise<string> {
    let ok = "Package deleted successfully";
    const pack: Package = await this.packageRepository.findOne({
      where: { id_package: id },
    } as FindOneOptions<Package>);

    if (!pack) {
      ok = "Package could not be deleted";
    }

    await this.packageRepository.remove(pack);
    return ok;
  }

  private async validateContract(contract: number) {
    const contractEntity = await this.contractRepository.findOneBy({
      id_contract: contract,
    });

    if (!contractEntity) {
      throw new BadRequestException("Contract not found");
    }

    return contractEntity;
  }

  //Reporte 7
  async list_of_packages_sales_income_plan(): Promise<
    Array<{
      promotional_name: string;
      pax_count: number;
      package_cost: number;
      package_price: number;
    }>
  > {
    const packages = await this.packageRepository
      .createQueryBuilder("p")
      .select([
        "p.promotional_name",
        "p.pax_count",
        "total_package_cost(p.id_package) AS total_package_cost",
        "total_package_price(p.id_package) AS total_package_price",
      ])
      .getRawMany(); // Usa getRawMany() en lugar de getMany() para obtener resultados crudos directamente

    return packages; /*.map(packageData => ({
        promotional_name: packageData.promotional_name,
        pax_count: packageData.pax_count,
        package_cost: packageData.total_package_cost,
        package_price: packageData.total_package_price,
    }));*/
  }

  //Reporte 6 en el proyecto original Itinerario de los paquetes
  async listOfPackageItinerary(): Promise<
    Array<{
      promotional_name: string;
      days_count: number;
      nights_count: number;
      pax_count: number;
      day_activity: Date;
      time_activity: Date;
      description_activity: string;
      total_activity_cost: number;
      name_hotel: string;
      room_type: string;
      plan_type: string;
      total_hotel_cost: number;
      hotel_airport_ride_cost: number;
      total_transportation_cost: number;
      package_cost: number;
      package_price: number;
    }>
  > {
    const queryBuilder = this.packageRepository.createQueryBuilder("p");

    queryBuilder
      .select([
        "p.promotional_name",
        "p.days_count",
        "p.nights_count",
        "p.pax_count",
        "d.day_activity",
        "d.time_activity",
        "d.description_activity",
        "total_activity_cost(p.id_package) AS total_activity_cost",
        "h.name_hotel",
        "r.room_type",
        "mp.plan_type",
        "total_hotel_cost(p.id_package) AS total_hotel_cost",
        "p.hotel_airport_ride_cost",
        "total_transportation_cost(p.id_package) AS total_transportation_cost",
        "total_package_cost(p.id_package) AS total_package_cost",
        "total_package_price(p.id_package) AS total_package_price",
      ])
      .innerJoin(Contract, "c", "p.id_package = c.id_package")
      .innerJoin(Daily_activity, "d", "c.id_activity = d.id_activity")
      .innerJoin(Acommodation, "hrs", "hrs.id_acomodation = c.id_acomodation")
      .innerJoin(Hotel, "h", "hrs.id_hotel = h.id_hotel")
      .innerJoin(Room, "r", "hrs.id_room = r.id_room")
      .innerJoin(Meal_plan, "mp", "r.id_plan = mp.id_plan");

    const results = await queryBuilder.getRawMany();

    return results;
  }
}
