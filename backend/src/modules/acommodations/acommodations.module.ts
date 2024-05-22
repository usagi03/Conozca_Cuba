import { Module } from '@nestjs/common';
import { AcommodationsService } from './service/acommodations.service';

@Module({
  providers: [AcommodationsService]
})
export class AcommodationsModule {}
