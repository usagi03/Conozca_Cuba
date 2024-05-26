import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Package } from "../package.entity";
import { CreatePackageDto } from "../dtos/create-package.dto";
import { UpdatePackageDto } from "../dtos/update-package.dto";
import { Contract } from "src/modules/contracts/contract.entity";

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
    const pack = this.packageRepository.create(newPackage);
    pack.contract = {
      id_contract: newPackage.contract.id_contract,
    } as Contract;
    return this.packageRepository.save(pack);
  }

  async updatePackage(id_package: number, newPackage: UpdatePackageDto) {
    const pack = await this.packageRepository.preload({
      id_package,
      promotional_name: newPackage.promotional_name,
      days_count: newPackage.days_count,
      nigths_count: newPackage.nigths_count,
      pax_count: newPackage.pax_count,
      hotel_airport_ride_cost: newPackage.hotel_airport_ride_cost,
      percent_profit: newPackage.percent_profit,
      contract: { id_contract: newPackage.contract.id_contract },
    });

    if (!pack) {
      throw new NotFoundException("Resource not found");
    }

    await this.packageRepository.save(pack);
    return pack;
  }

  async removePackage(id: number): Promise<string> {
    const pack: Package = await this.packageRepository.findOne({
      where: { id_package: id },
    } as FindOneOptions<Package>);
    let ok: string = "NO ELIMINADO";

    if (!pack) {
      throw new NotFoundException("Resource not found");
    } else {
      ok = "ELIMINADO";
    }

    await this.packageRepository.remove(pack);
    return ok;
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
    const packages = this.packageRepository
      .createQueryBuilder("p")
      .select([
        "p.promotional_name",
        "p.pax_count",
        "total_package_cost(p.id_package) AS total_package_cost",
        "total_package_price(p.id_package) AS total_package_price",
      ])
      .getRawMany();

    return packages;
  }
}
