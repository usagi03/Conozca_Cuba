/* eslint-disable @typescript-eslint/no-var-requires */

import { Injectable } from "@nestjs/common";
import { HotelsService } from "src/modules/hotels/service/hotels.service";
import { PackagesService } from "src/modules/packages/service/packages.service";
import { Package } from "src/modules/packages/package.entity";
import { Contract } from "src/modules/contracts/contract.entity";
import { Daily_activity } from "src/modules/activities/activities.entity";
import { Hotel } from "src/modules/hotels/hotels.entity";
import { Room } from "src/modules/rooms/rooms.entity";
import { Meal_plan } from "src/modules/meal_plans/plans.entity";
import { Acommodation } from "src/modules/acommodations/acommodations.entity";
import { getManager } from "typeorm";

const PDFDocument = require("pdfkit-table");

@Injectable()
export class ReportsService {
  constructor(
    private readonly hotelService: HotelsService,
    private readonly packageService: PackagesService
  ) {}

  //Reporte 8
  async generateListInactiveHotelsPDF() {
    const inactiveHotels = await this.hotelService.listInactiveHotels();

    return new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        autoFirstPage: true,
      });

      const row_inactiveHotels = [];

      inactiveHotels.forEach((element) => {
        const temp_list = [
          element.name_hotel,
          element.chain_hotel,
          element.category_hotel,
          element.address_hotel,
          element.province_hotel,
        ];
        row_inactiveHotels.push(temp_list);
      });

      const table = {
        title: "Ejemplo",
        headers: ["Nombre", "Cadena", "Categoria", "Provincia", "Direccion"],
        rows: row_inactiveHotels,
      };

      doc.table(table, {
        columnsSize: [80, 50, 50, 50, 50],
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(chunks);
        resolve(pdfData);
      });
      doc.end();
    });
  }
  //Reporte 7
  async generateListOfPackagesIncomePlanPDF(): Promise<Buffer> {
    const incomePlan =
      await this.packageService.list_of_packages_sales_income_plan();

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        autoFirstPage: true,
      });

      const row_incomePlan = [];

      incomePlan.forEach((element) => {
        const temp_list = [
          element.promotional_name,
          element.pax_count,
          element.package_cost,
          element.package_price,
        ];
        row_incomePlan.push(temp_list);
      });

      //El contenido va aqui

      const table = {
        title: "Plan de ingresos de la agencia",
        headers: ["Nombre", "Pasajeros", "Costo total", "Ganancia"],
        rows: row_incomePlan,
      };

      doc.table(table, {
        columnsSize: [50, 50, 50, 50],
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(chunks);
        resolve(pdfData);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  //Reporte 6
  async generateListOfPackagesItineraryPDF(): Promise<Buffer> {
    const itinerary = await this.listOfPackageItinerary();

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        autoFirstPage: true,
      });

      const row_itinerary = [];

      itinerary.forEach((element) => {
        const temp_list = [
          element.promotional_name,
          element.days_count,
          element.nights_count,
          element.pax_count,
          element.day_activity,
          element.description_activity,
          element.total_activity_cost,
          element.name_hotel,
          element.room_type,
          element.plan_type,
          element.total_hotel_cost,
          element.total_transportation_cost,
          element.package_cost,
        ];
        row_itinerary.push(temp_list);
      });

      doc.addPage();
      //El contenido va aqui

      const table = {
        title: "Itinerario establecio en cada paquete",
        headers: [
          "Paquete Promocional",
          "Días",
          "Noches",
          "Pasajeros",
          "Actividad del Día",
          "Descripción de la Actividad",
          "Costo Total de Actividad",
          "Nombre del Hotel",
          "Tipo de Habitación",
          "Tipo de Plan",
          "Costo Total del Hotel",
          "Costo Total de Transporte",
          "Costo del Paquete",
        ],
        rows: row_itinerary,
      };

      doc.table(table, {
        columnsSize: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(chunks);
        resolve(pdfData);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  //Reporte 5
  async generateListOfActiveHotelsPDF(
    chainH: string,
    provinceH: string
  ): Promise<Buffer> {
    const hotels = await this.hotelService.listOfActiveHotel(chainH, provinceH);

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        autoFirstPage: true,
      });

      const row_itinerary = [];

      hotels.forEach((element: Hotel) => {
        const temp_list = [
          element.name_hotel,
          element.chain_hotel,
          element.category_hotel,
          element.address_hotel,
          element.province_hotel,
          element.phone,
          element.email,
          element.distance_to_city,
          element.distance_to_airport,
        ];
        row_itinerary.push(temp_list);
      });
      //El contenido va aqui

      const table = {
        title: "Itinerario establecio en cada paquete",
        headers: [
          "Nombre",
          "Cadena",
          "Categoría",
          "Dirección",
          "Provincia",
          "Teléfono",
          "Correo Electrónico",
          "Distancia a la ciudad",
          "Distancia al aeropuerto",
        ],
        rows: row_itinerary,
      };

      doc.table(table, {
        columnsSize: [50, 50, 50, 50, 50, 50, 50, 50, 50],
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const pdfData = Buffer.concat(chunks);
        resolve(pdfData);
      });
      doc.end();
    });

    return pdfBuffer;
  }

  //Funciones referentes para los reportes

  //Reporte 6 en el proyecto original Itinerario de los paquetes
  async listOfPackageItinerary(): Promise<
    Array<{
      promotional_name: string;
      days_count: number;
      nights_count: number;
      pax_count: number;
      day_activity: Date;
      time_activity: Date;
      description_activity: string;
      total_activity_cost: number;
      name_hotel: string;
      room_type: string;
      plan_type: string;
      total_hotel_cost: number;
      hotel_airport_ride_cost: number;
      total_transportation_cost: number;
      package_cost: number;
      package_price: number;
    }>
  > {
    const manager = getManager();
    const queryBuilder = manager.createQueryBuilder();

    queryBuilder
      .select([
        "p.promotional_name",
        "p.days_count",
        "p.nights_count",
        "p.pax_count",
        "d.day_activity",
        "d.time_activity",
        "d.description_activity",
        "total_activity_cost(p.id_package) AS total_activity_cost",
        "h.name_hotel",
        "r.room_type",
        "mp.plan_type",
        "total_hotel_cost(p.id_package) AS total_hotel_cost",
        "p.hotel_airport_ride_cost",
        "total_transportation_cost(p.id_package) AS total_transportation_cost",
        "total_package_cost(p.id_package) AS total_package_cost",
        "total_package_price(p.id_package) AS total_package_price",
      ])
      .from(Package, "p")
      .innerJoin(Contract, "c", "p.id_package = c.id_package")
      .innerJoin(Daily_activity, "d", "c.id_activity = d.id_activity")
      .innerJoin(Acommodation, "hrs", "hrs.id_acomodation = c.id_acomodation")
      .innerJoin(Hotel, "h", "hrs.id_hotel = h.id_hotel")
      .innerJoin(Room, "r", "hrs.id_room = r.id_room")
      .innerJoin(Meal_plan, "mp", "r.id_plan = mp.id_plan");

    const results = await queryBuilder.getMany();

    return results;
  }
}
