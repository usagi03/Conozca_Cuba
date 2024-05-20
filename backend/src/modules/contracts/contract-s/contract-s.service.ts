import { Injectable, NotFoundException } from "@nestjs/common";
import { Contract } from "../contract.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createContractDto } from "../dto/create_contractDto";
import { updateContractDto } from "../dto/update_contractDto";

@Injectable()
export class ContractSService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>
  ) {}

  async getContracts(): Promise<Contract[]> {
    return await this.contractRepository.find();
  }

  async getContract(id: number): Promise<Contract> {
    const contracts = await this.contractRepository.find();
    const contract = contracts.find(
      (contracts) => contracts.id_contract === id
    );

    if (!contract) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return contract;
  }

  async createContract({
    start_contract,
    end_contract,
    resolution_contract,
    description,
    id_transportation,
    id_activity,
    id_hotel_room_season,
  }: createContractDto) {
    const contract: Contract = this.contractRepository.create({
      start_contract,
      end_contract,
      resolution_contract,
      description,
      id_transportation,
      id_activity,
      id_hotel_room_season,
    });
    return this.contractRepository.save(contract);
  }

  async updateContract(
    id: number,
    {
      start_contract,
      end_contract,
      resolution_contract,
      description,
      id_transportation,
      id_activity,
      id_hotel_room_season,
    }: updateContractDto
  ) {
    const contract: Contract = await this.contractRepository.preload({
      start_contract,
      end_contract,
      resolution_contract,
      description,
      id_transportation,
      id_activity,
      id_hotel_room_season,
    });

    if (!contract) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }
    return this.contractRepository.save(contract);
  }

  async removeVehicle(id: number): Promise<void> {
    const aux = await this.contractRepository.find();
    const contract = aux.find((contract) => contract.id_contract === id);
    if (!contract) {
      throw new NotFoundException("Resource not found");
    } else {
      this.contractRepository.remove(contract);
    }
  }
}
