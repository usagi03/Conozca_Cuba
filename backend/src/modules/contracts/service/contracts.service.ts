import { Injectable, NotFoundException } from "@nestjs/common";
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
    /*@InjectRepository(Transportation)
    private readonly transportationRepository: Repository<Transportation>,
    @InjectRepository(Acommodation) 
    private readonly acommodationRepository: Repository<Acommodation>,
    @InjectRepository(Daily_activity)
    private readonly activityRepository: Repository<Daily_activity>*/) {}


  async getContracts(): Promise<Contract[]> {
    return await this.contractRepository.find({relations: ['transportation', 'acommodation', 'daily_activity']});
  }

  async getContract(id: number): Promise<Contract> {
    console.log(id);
    const contract = await this.contractRepository.findOne({ relations: ['transportation', 'acommodation', 'daily_activity'], where: { id_contract: id } } as FindOneOptions<Contract>);
    console.log(contract);

    if (!contract) {
        throw new NotFoundException('Resource not found');
    }

    return contract;
  }

  async createContract(newContract: CreateContractDto): Promise<Contract> {
    const contract: Contract = this.contractRepository.create(newContract);
    contract.transportation = { id_transportation: newContract.transportation.id_transportation } as Transportation; 
    contract.acommodation = { id_acommodation: newContract.acommodation.id_acommodation } as Acommodation; 
    contract.activity = { id_activity: newContract.activity.id_activity } as Daily_activity;
    return this.contractRepository.save(contract);
  }

  async updateContract(id_contract: number, newContract: UpdateContractDto) {
    const contract = await this.contractRepository.preload({
        id_contract,
        start_contract: newContract.start_contract,
        end_contract: newContract.end_contract,
        resolution_contract: newContract.resolution_contract,
        description: newContract.description,
        transportation: { id_transportation: newContract.transportation.id_transportation },
        acommodation: { id_acommodation: newContract.acommodation.id_acommodation },
        activity: { id_activity: newContract.activity.id_activity }
    });

    if (!contract) {
        throw new NotFoundException('Resource not found');
    }

    await this.contractRepository.save(contract);
    return contract;
}

  async removeContract(id: number): Promise<string> {
    const contract: Contract = await this.contractRepository.findOne({ where: { id_contract: id } } as FindOneOptions<Contract>);
        let ok: string = 'NO ELIMINADO';

        if (!contract) {
            throw new NotFoundException('Resource not found');
        } else {
            ok = 'ELIMINADO';
        }
    
        await this.contractRepository.remove(contract);
        return ok;
  }
}
