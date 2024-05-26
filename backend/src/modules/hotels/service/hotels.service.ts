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
    const hotel = this.hotelRepository.create(newHotel);
    return this.hotelRepository.save(hotel);
  }

  async updateHotel(id_hotel: number, newHotel: UpdateHotelDto) {
    const hotel = await this.hotelRepository.preload({
      id_hotel,
      name_hotel: newHotel.name_hotel,
      category_hotel: newHotel.category_hotel,
      address_hotel: newHotel.address_hotel,
      province_hotel: newHotel.province_hotel,
      date_hotel: newHotel.date_hotel,
      phone: newHotel.phone,
      fax: newHotel.fax,
      email: newHotel.email,
      distance_to_city: newHotel.distance_to_city,
      distance_to_airport: newHotel.distance_to_airport,
      floor_count: newHotel.floor_count,
      business_model: newHotel.business_model,
      location_hotel: newHotel.location_hotel,
    });

    if (!hotel) {
      throw new NotFoundException("Resource not found");
    }

    await this.hotelRepository.save(hotel);
    return hotel;
  }

  async removeHotel(id: number): Promise<string> {
    const hotel: Hotel = await this.hotelRepository.findOne({
      where: { id_hotel: id },
    } as FindOneOptions<Hotel>);
    let ok: string = "NO ELIMINADO";

    if (!hotel) {
      throw new NotFoundException("Resource not found");
    } else {
      ok = "ELIMINADO";
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
        "h.name_hotel",
        "h.chain_hotel",
        "h.category_hotel",
        "h.address_hotel",
        "h.province_hotel",
      ])
      .where(["h.isActive = :isActive", { isActive: false }])
      .getRawMany();

    return inactiveHotels;
  }
}
