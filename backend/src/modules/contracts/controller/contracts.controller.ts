import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { UpdateContractDto } from "../dtos/update-contract.dto";
import { Contract } from "../contract.entity";
import { ContractsService } from "../service/contracts.service";

@Controller("contract")
export class ContractsController {
  constructor(private readonly contractService: ContractsService) {}

  @Get(":all")
  async getContracts(): Promise<Contract[]> {
    return this.contractService.getContracts();
  }

  @Get(":id_contract")
  async getContract(@Param("id_contract") id: number): Promise<Contract> {
    return this.contractService.getContract(id);
  }

  @Post(":id_contract")
  async createContract(@Body() contract: CreateContractDto): Promise<Contract> {
    return this.contractService.createContract(contract);
  }

  @Patch(":id_contract")
  async updateContract(@Param('id_contract') id: number, @Body() contract: UpdateContractDto) {
    return this.contractService.updateContract(id, contract);
  }

  @Delete(":id_contract")
  async removeContract(@Param("id_contract") id: number): Promise<string> {
    return this.contractService.removeContract(id);
  }
}
