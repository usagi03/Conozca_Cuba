import { Injectable, NotFoundException } from "@nestjs/common";
import { Route } from "../route.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRouteDto } from "../dto/create_route.dto";
import { UpdateRouteDto } from "../dto/update_route.dto";

@Injectable()
export class RouteSService {
  constructor(
    @InjectRepository(Route)
    private readonly routesRepository: Repository<Route>
  ) {}

  async getRoutes(): Promise<Route[]> {
    return await this.routesRepository.find();
  }

  async getRoute(id: number): Promise<Route> {
    const route = await this.routesRepository.find();
    const e = route.find((route) => route.id_transp_model === id);

    if (!e) {
      throw new NotFoundException("RESOURCE NOT FOUND");
    }

    return e;
  }

  async createRoute({
    type_trans_model,
    description,
    description_route,
    route_cost,
    full_ride_cost,
  }: CreateRouteDto) {
    const aux: Route = this.routesRepository.create({
      type_trans_model,
      description,
      description_route,
      route_cost,
      full_ride_cost,
    });
    return this.routesRepository.save(aux);
  }

  async updateRoute(
    id: number,
    {
      type_trans_model,
      description,
      description_route,
      route_cost,
      full_ride_cost,
    }: UpdateRouteDto
  ) {
    const aux: Route = await this.routesRepository.preload({
      type_trans_model,
      description,
      description_route,
      route_cost,
      full_ride_cost,
    });

    if (!aux) {
      throw new NotFoundException("Resource not found");
    }
    return this.routesRepository.save(aux);
  }

  async removeRoute(id: number): Promise<void> {
    const route = await this.routesRepository.find();
    const e = route.find((route) => route.id_transp_model === id);
    if (!e) {
      throw new NotFoundException("Resource not found");
    } else {
      this.routesRepository.remove(e);
    }
  }
}
