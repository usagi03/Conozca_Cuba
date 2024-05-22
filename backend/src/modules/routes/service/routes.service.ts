import { Injectable, NotFoundException } from "@nestjs/common";
import { Route } from "../route.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateRouteDto } from "../dtos/create-route.dto";
import { UpdateRouteDto } from "../dtos/update-route.dto";

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>
  ) {}

  async getRoutes(): Promise<Route[]> {
    return await this.routeRepository.find();
  }

  async getRoute(id: number): Promise<Route> {
    console.log(id);
    const route = await this.routeRepository.findOne({ where: { id_transp_model: id } });
    console.log(route);
  
    if (!route) {
        throw new NotFoundException('Resource not found');
    }
  
    return route;
  }

  async createRoute(newRoute: CreateRouteDto): Promise<Route> {
    const route = this.routeRepository.create(newRoute);
    return this.routeRepository.save(route);
  }

  async updateRoute(id_transp_model: number, newRoute: UpdateRouteDto) {
    const route = await this.routeRepository.preload({
        id_transp_model,
        type_transp_model: newRoute.type_transp_model,
        description_tm: newRoute.description_tm,
        description_route: newRoute.description_route,
        route_cost: newRoute.route_cost,
        full_ride_cost: newRoute.full_ride_cost
    });

    if (!route) {
        throw new NotFoundException('Resource not found');
    }

    await this.routeRepository.save(route);
    return route;
  } 

async removeRoute(id: number): Promise<string> {
    const route: Route = await this.routeRepository.findOne({ where: { id_route: id } } as FindOneOptions<Route>);
    let ok: string = 'NO ELIMINADO';

    if (!route) {
        throw new NotFoundException('Resource not found');
    } else {
        ok = 'ELIMINADO';
    }

    await this.routeRepository.remove(route);
    return ok;
}
}
