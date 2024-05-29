import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Contract } from "../contract.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Transportation } from "src/modules/transportations/transportation.entity";
import { Acommodation } from "src/modules/acommodations/acommodations.entity";
import { Daily_activity } from "src/modules/activities/activities.entity";
import { CreateContractDto, UpdateContractDto } from "../dtos";

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    @InjectRepository(Transportation)
    private readonly transportationRepository: Repository<Transportation>,
    @InjectRepository(Acommodation) 
    private readonly acommodationRepository: Repository<Acommodation>,
    @InjectRepository(Daily_activity)
    private readonly activityRepository: Repository<Daily_activity>) {}


  async getContracts(): Promise<Contract[]> {
    return await this.contractRepository.find({relations: ['transportation', 'acommodation', 'activity']});
  }

  async getContract(id: number): Promise<Contract> {
    console.log(id);
    const contract = await this.contractRepository.findOne({ relations: ['transportation', 'acommodation', 'activity'], where: { id_contract: id } } as FindOneOptions<Contract>);
    console.log(contract);

    if (!contract) {
        throw new NotFoundException('Resource not found');
    }

    return contract;
  }

  async createContract(newContract: CreateContractDto): Promise<Contract> {
    const transportation = await this.validateTransportation(newContract.transportation);
    const acommodation = await this.validateAcommodation(newContract.acommodation);
    const activity = await this.validateActivity(newContract.activity);
    return await this.contractRepository.save({
      ...newContract,
      transportation: transportation,
      acommodation: acommodation,
      activity: activity,
    });
  }

  async updateContract(id_contract: number, newContract: UpdateContractDto) {
    let ok = "Contract could not be updated"
    const affectedRows = await this.contractRepository.update(id_contract, {
      ...newContract,
      transportation: newContract.transportation? await this.validateTransportation(newContract.transportation) : undefined,
      acommodation: newContract.acommodation? await this.validateAcommodation(newContract.acommodation) : undefined,
      activity: newContract.activity? await this.validateActivity(newContract.activity) : undefined,
    });
     
    if (affectedRows.affected > 0) {
        ok = "Contract updated successfully";
    } 
    return ok;
}

  async removeContract(id: number): Promise<string> {
    let ok = "Contract deleted successfully"
    const contract: Contract = await this.contractRepository.findOne({ where: { id_contract: id } } as FindOneOptions<Contract>);
    
    if (!contract) {
        ok = "Contract could not be deleted";
    }
         
    await this.contractRepository.remove(contract);
    return ok;
  }

  private async validateTransportation(transportation: number) {
    const transportationEntity = await this.transportationRepository.findOneBy({ id_transportation: transportation });
  
    if (!transportationEntity) {
      throw new BadRequestException('Transportation not found');
    }
  
    return transportationEntity;
  }

  private async validateAcommodation(acommodation: number) {
    const acommodationEntity = await this.acommodationRepository.findOneBy({ id_acommodation: acommodation });
  
    if (!acommodationEntity) {
      throw new BadRequestException('Acommodation not found');
    }
  
    return acommodationEntity;
  }

  private async validateActivity(activity: number) {
    const activityEntity = await this.activityRepository.findOneBy({ id_activity: activity });
  
    if (!activityEntity) {
      throw new BadRequestException('Activity not found');
    }
  
    return activityEntity;
  }
}
