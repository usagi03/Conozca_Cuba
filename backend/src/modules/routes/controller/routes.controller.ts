import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Route } from "../route.entity";
import { CreateRouteDto } from "../dtos/create-route.dto";
import { UpdateRouteDto } from "../dtos/update-route.dto";
import { RoutesService } from "../service/routes.service";
import { CreateModelDto, UpdateModelDto } from "src/modules/transportation_models/dtos";

@Controller("routes")
export class RoutesController {
  constructor(private readonly routeService: RoutesService) {}

  @Get()
  async getRoutes(): Promise<Route[]> {
    return this.routeService.getRoutes();
  }

  @Get(":id_route")
  async getRoute(@Param("id_route") id: number): Promise<Route> {
    return this.routeService.getRoute(id);
  }

  @Post()
  async createRoute(@Body() model: CreateModelDto, route: CreateRouteDto): Promise<Route> {
    return this.routeService.createRoute(model, route);
  }
  
  @Patch(":id_route")
  updateRoute(@Param('id_route') id: number, @Body() model:UpdateModelDto, route: UpdateRouteDto) {
    return this.routeService.updateRoute(id, model, route);
  }

  @Delete(":id_route")
  async removeRoute(@Param("id_route") id: number): Promise<string> {
    return this.routeService.removeRoute(id);
  }
}
