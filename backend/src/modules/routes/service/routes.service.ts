import { Injectable, NotFoundException } from "@nestjs/common";
import { Route } from "../route.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateRouteDto } from "../dtos/create-route.dto";
import { UpdateRouteDto } from "../dtos/update-route.dto";
import { TransportationModelsService } from "src/modules/transportation_models/service/transportation_models..service";
import { Transportation_model } from "src/modules/transportation_models/model.entity";

@Injectable()
export class RoutesService {
  constructor(
    private readonly modelService: TransportationModelsService,
    
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>
  ) {}

  /*
  async getRoutes(): Promise<Route[]> {
    return await this.routeRepository.find();
  }*/
  async getRoutes() {
    const routes = await this.routeRepository.find();
  
    const enhancedRoutes = await Promise.all(routes.map(async (route) => {
      const model = await this.modelService.getModel(route.id_transp_model);
      return {...route, model };
    }));
  
    return enhancedRoutes;
  }
  
  /*async getRoute(id: number): Promise<Route> {
    console.log(id);
    const route = await this.routeRepository.findOne({ where: { id_transp_model: id } });
    console.log(route);
  
    if (!route) {
        throw new NotFoundException('Resource not found');
    }
  
    return route;
  }*/
  async getRoute(id: number) {
    const route = await this.routeRepository.findOne({ where: { id_transp_model: id } });
  
    if (!route) {
      throw new NotFoundException('Resource not found');
    }
  
    const model = await this.modelService.getModel(route.id_transp_model);
  
    return {...route, model };
  }  

  async createRoute(newRoute: CreateRouteDto): Promise<Route> {
    const model = await this.modelService.createModel(newRoute.type_transp_model, newRoute.description_tm);
    console.log(model);
    
    const r = new Route;
    r.id_transp_model = (await model).id_transp_model;
    r.description_route = newRoute.description_route;
    r.route_cost = newRoute.route_cost;
    r.full_ride_cost = newRoute.full_ride_cost;
    
    const route = this.routeRepository.create(r);

    return this.routeRepository.save(route);
  }

  async updateRoute(id_transp_model: number, newRoute: UpdateRouteDto) {
    let ok = "Route could not be updated"

    await this.modelService.updateModel(id_transp_model, newRoute.description_tm);

    const r = new Route;
    r.description_route = newRoute.description_route;
    r.route_cost = newRoute.route_cost;
    r.full_ride_cost = newRoute.full_ride_cost;
    const affectedRows = await this.routeRepository.update(id_transp_model, r);
     
    if (affectedRows.affected > 0) {
        ok = "Route updated successfully";
    } 
    return ok;
  } 

  async removeRoute(id: number): Promise<string> {
    let ok = "Route deleted successfully"
    const model: Transportation_model = await this.modelService.getModel(id);
    const route: Route = await this.routeRepository.findOne({ where: { id_transp_model: id } } as FindOneOptions<Route>);
    
    if (!(model && route)) {
        ok = "Route could not be deleted";
    }
    
    await this.modelService.removeModel(id);
    await this.routeRepository.remove(route);
    return ok;
  }
}
