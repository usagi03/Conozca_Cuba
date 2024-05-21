import { Module } from '@nestjs/common';
import { AcommodationsService } from './service/acommodations./acommodations.service';

@Module({
  providers: [AcommodationsService]
})
export class AcommodationsModule {}
