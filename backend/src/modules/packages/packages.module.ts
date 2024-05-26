import { Module } from '@nestjs/common';
import { PackagesController } from './controller/packages.controller';
import { PackagesService } from './service/packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { Contract } from '../contracts/contract.entity';
import { ContractsModule } from '../contracts/contracts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Contract]), ContractsModule],
  controllers: [PackagesController],
  providers: [PackagesService]
})
export class PackagesModule {}
