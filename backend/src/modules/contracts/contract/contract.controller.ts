import { ContractSService } from "../contract-s/contract-s.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { createContractDto } from "../dto/create_contractDto";
import { updateContractDto } from "../dto/update_contractDto";
import { Contract } from "../contract.entity";

@Controller("contract")
export class ContractController {
  constructor(private readonly contractSService: ContractSService) {}

  @Get(":all")
  async getContracts(): Promise<Contract[]> {
    return this.contractSService.getContracts();
  }

  @Get(":id")
  async getContract(@Param("id") id: number): Promise<Contract> {
    return this.contractSService.getContract(id);
  }

  @Post(":id")
  async createContract(@Body() contract: createContractDto): Promise<Contract> {
    return this.contractSService.createContract(contract);
  }

  @Patch(":id")
  async updateContract(
    @Param("id") id: number,
    @Body() contract: updateContractDto
  ): Promise<Contract> {
    return this.contractSService.updateContract(id, contract);
  }

  @Delete(":id")
  async removeContract(@Param("id") id: number): Promise<void> {
    return this.contractSService.removeVehicle(id);
  }
}
