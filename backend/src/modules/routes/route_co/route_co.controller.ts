import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RouteSService } from "../route_s/route_s.service";
import { Route } from "../route.entity";
import { CreateRouteDto } from "../dto/create_route.dto";
import { UpdateRouteDto } from "../dto/update_route.dto";

@Controller("route-co")
export class RouteCoController {
  constructor(private readonly routeService: RouteSService) {}

  @Get()
  async getRoutes(): Promise<Route[]> {
    return this.routeService.getRoutes();
  }

  @Get(":id")
  async getRoute(@Param("id") id: number): Promise<Route> {
    return this.routeService.getRoute(id);
  }

  @Post()
  async createRoute(@Body() route: CreateRouteDto): Promise<Route> {
    return this.routeService.createRoute(route);
  }
  @Patch(":id")
  async updateRoute(
    @Param("id") id: number,
    @Body() route: UpdateRouteDto
  ): Promise<Route> {
    return this.routeService.updateRoute(id, route);
  }

  @Delete(":id")
  async deleteRoute(@Param("id") id: number): Promise<void> {
    return this.routeService.removeRoute(id);
  }
}
