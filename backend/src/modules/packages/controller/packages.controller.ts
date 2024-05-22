import { Body, Controller, Get, Param, Post, Patch, Delete} from '@nestjs/common';
import { PackagesService } from '../service/packages.service';
import { Package } from '../package.entity';
import { UpdatePackageDto } from '../dtos/update-package.dto';
import { CreatePackageDto } from '../dtos/create-package.dto';

@Controller('packages.')
export class PackagesController {
  constructor(private readonly packageService: PackagesService){}

  @Get()
  getPackages(): Promise<Package[]> {
    return this.packageService.getPackages();
  }

  @Get(':id_package')
  getPackage(@Param('id_package') id: number): Promise<Package> {
    return this.packageService.getPackage(id);
  }

  @Post()
  createPackage(@Body() pack: CreatePackageDto): Promise<Package> {
    return this.packageService.createPackage(pack);
  }

  @Patch(':id_package')
  updatePackage(@Param('id_package') id: number, @Body() pack: UpdatePackageDto): Promise<Package> {
    return this.packageService.updatePackage(id, pack);
  }

  @Delete(':id_package')
  deletePackage(@Param('id_package') id: number): Promise<string> {
    return this.packageService.removePackage(id);
  }
}
