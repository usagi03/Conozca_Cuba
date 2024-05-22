import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Room } from "../rooms/rooms.entity";
import { Season } from "../seasons/seasons.entity";
import { Hotel } from "../hotels/hotels.entity";

@Entity("acommodation")
export class Acommodation {
    @PrimaryGeneratedColumn('increment')
    id_acommodation: number;

    @ManyToOne(() => Room, (room) => room.id_room, {
        eager: true,
      })
      @JoinColumn({name: 'id_room'})
      room: Room;

    @ManyToOne(() => Season, (season) => season.id_season, {
        eager: true, 
      })
      @JoinColumn({name: 'id_season'})
      season: Season;

    @ManyToOne(() => Hotel, (hotel) => hotel.id_hotel, {
        eager: true,
      })
      @JoinColumn({name: 'id_hotel'})
      hotel: Hotel;
}