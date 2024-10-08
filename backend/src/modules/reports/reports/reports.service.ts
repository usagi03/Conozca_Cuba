/* eslint-disable @typescript-eslint/no-var-requires */

import { Injectable } from "@nestjs/common";
import { HotelsService } from "src/modules/hotels/service/hotels.service";
import { PackagesService } from "src/modules/packages/service/packages.service";
import { Hotel } from "src/modules/hotels/hotels.entity";

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
        title: "Listado de hoteles inactivos",
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
    const incomePlan = await this.packageService.list_of_packages_sales_income_plan();
    console.log(incomePlan)
    incomePlan.forEach((element) => {
      console.log(element.promotional_name),
      console.log(element.pax_count),
      console.log(element.package_cost),
      console.log(element.package_price)
    });

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

      console.log(row_incomePlan);

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
    const itinerary = await this.packageService.listOfPackageItinerary();

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "A4",
        autoFirstPage: true,
        layout: 'landscape'
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

      //doc.addPage();

      const table = {
        title: "Itinerario de paquetes",
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
        columnsSize: [50, 40, 40, 40, 50, 60, 50, 50, 50, 50, 50, 50, 50],
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
  async generateListOfActiveHotelsPDF(): Promise<Buffer> {
    const hotels = await this.hotelService.listOfActiveHotel();

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        autoFirstPage: true,
      });

      const rows = [];

      hotels.forEach((element: Hotel) => {
        const temp_list = [
          element.name_hotel,
          element.chain_hotel,
          element.category_hotel,
          element.address_hotel,
          element.province_hotel,
          element.phone,
          element.email,
          element.distance_to_city.toString(),
          element.distance_to_airport.toString(),
        ];
        rows.push(temp_list);
      });
      //El contenido va aqui

      const table = {
        title: "Listado de hoteles activos",
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
        rows: rows,
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
}
