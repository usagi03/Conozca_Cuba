import { Injectable, NotFoundException } from "@nestjs/common";
import { Hotel } from "../hotels.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { CreateHotelDto, UpdateHotelDto } from "../dtos";

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>
  ) {}

  async getHotels(): Promise<Hotel[]> {
    return await this.hotelRepository.find();
  }

  async getHotel(id: number): Promise<Hotel> {
    console.log(id);
    const hotel = await this.hotelRepository.findOne({
      where: { id_hotel: id },
    });
    console.log(hotel);

    if (!hotel) {
      throw new NotFoundException("Resource not found");
    }

    return hotel;
  }

  async createHotel(newHotel: CreateHotelDto): Promise<Hotel> {
    return await this.hotelRepository.save({
      ...newHotel,
    });
  }

  async updateHotel(id_hotel: number, newHotel: UpdateHotelDto) {
    let ok = "Hotel could not be updated"
    const affectedRows = await this.hotelRepository.update(id_hotel, {
      ...newHotel,
    });
     
    if (affectedRows.affected > 0) {
        ok = "Hotel updated successfully";
    } 
    return ok;
  }

  async removeHotel(id: number): Promise<string> {
    let ok = "Hotel deleted successfully"
    const hotel: Hotel = await this.hotelRepository.findOne({ where: { id_hotel: id } } as FindOneOptions<Hotel>);
    
    if (!hotel) {
        ok = "Hotel could not be deleted";
    }
         
    await this.hotelRepository.remove(hotel);
    return ok;
  }

  //Reporte 8
  async listInactiveHotels(): Promise<
    Array<{
      name_hotel: string;
      chain_hotel: string;
      category_hotel: string;
      address_hotel: string;
      province_hotel: string;
    }>
  > {
    const inactiveHotels = await this.hotelRepository
      .createQueryBuilder("h")
      .select([
        "h.id_hotel",
        "h.name_hotel",
        "h.chain_hotel",
        "h.category_hotel",
        "h.address_hotel",
        "h.province_hotel",
      ])
      .where(["h.is_active = :is_active"], {is_active: false})
      .getMany()

    return inactiveHotels;
  }

  //Reporte 5

  async listOfActiveHotel(
    chainH: string,
    provinceH: string
  ): Promise<Array<Hotel>> {
    const hotels = this.hotelRepository.createQueryBuilder("h");

    if (chainH !== undefined && chainH !== null) {
      hotels.andWhere("h.chain_hotel = :chainH", { chainH });
    }

    if (provinceH !== undefined && provinceH !== null) {
      hotels.andWhere("h.province_hotel = :provinceH", { provinceH });
    }

    hotels.where("h.is_active = true");

    // Agregar otros campos requeridos para la consulta
    hotels.select([
      "h.name_hotel",
      "h.chain_hotel",
      "h.category_hotel",
      "h.address_hotel",
      "h.province_hotel",
      "h.date_hotel",
      "h.phone",
      "h.fax",
      "h.email",
      "h.distance_to_city",
      "h.distance_to_airport",
      "room_count(h.id_hotel) AS room_count",
      "h.floor_count",
      "h.location_hotel",
      "h.business_model",
    ]);

    // Ejecutar la consulta y obtener los resultados
    const results = await hotels.getMany();

    // Devuelve los resultados o haz algo con ellos según sea necesario
    return results;
  }
}
