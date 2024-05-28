import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Route } from "../route.entity";
import { CreateRouteDto } from "../dtos/create-route.dto";
import { UpdateRouteDto } from "../dtos/update-route.dto";
import { RoutesService } from "../service/routes.service";

@Controller("routes")
export class RoutesController {
  constructor(private readonly routeService: RoutesService) {}

  @Get()
  async getRoutes() {
    return this.routeService.getRoutes();
  }

  @Get(":id_route")
  async getRoute(@Param("id_route") id: number) {
    return this.routeService.getRoute(id);
  }

  @Post()
  async createRoute(@Body() route: CreateRouteDto): Promise<Route> {
    return this.routeService.createRoute(route);
  }
  
  @Patch(":id_route")
  updateRoute(@Param('id_route') id: number, @Body() route: UpdateRouteDto) {
    return this.routeService.updateRoute(id, route);
  }

  @Delete(":id_route")
  async removeRoute(@Param("id_route") id: number): Promise<string> {
    return this.routeService.removeRoute(id);
  }
}
