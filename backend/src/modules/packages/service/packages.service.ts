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
  async list_of_packages_sales_income_plan(): Promise<Array<{
      promotional_name: string;
      pax_count: number;
      package_cost: number;
      package_price: number;
    }> > {
      const packages = await this.packageRepository
      .createQueryBuilder("p")
      .select([
        "p.promotional_name",
        "p.pax_count",
        "total_package_cost(p.id_package) AS total_package_cost",
        "total_package_price(p.id_package) AS total_package_price",
      ])
      .getRawMany(); // Usa getRawMany() en lugar de getMany() para obtener resultados crudos directamente

    return packages/*.map(packageData => ({
        promotional_name: packageData.promotional_name,
        pax_count: packageData.pax_count,
        package_cost: packageData.total_package_cost,
        package_price: packageData.total_package_price,
    }));*/
  }
}
