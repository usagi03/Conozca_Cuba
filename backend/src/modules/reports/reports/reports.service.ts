/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from "@nestjs/common";
import { HotelsService } from "src/modules/hotels/service/hotels.service";
//import * as config from "config";
//import { config } from "./../../../../config/config";
//import { reportopt } from "config/report";

const PDFDocument = require("pdfkit-table");

//const jasper = require("node-jasper")(reportopt);

@Injectable()
export class ReportsService {
  constructor(private readonly hotelService: HotelsService) {}

  //  Ejemplo de funci'on que corresponde al reporte.Se debe modificar
  /*async getPdfTransactionreceipt(): Promise<any[]> {
    try {
      const data = this.listInactiveHotels();
      return await this.generatePdf(config.re, data, {});
    } catch (e) {
      Logger.log(JSON.stringify(e), `GET_Report_Error`);
      throw new BadRequestException(e.message || e.response.message);
    }
  }

  async generatePDF(reportJasper, data: any, parameter: any) {
    const report = {
      report: reportJasper,
      data: parameter,
      dataset: data,
    };
    return jasper.pdf(report);
  }*/

  async generatePDF(): Promise<Buffer> {
    const inactiveHotels = await this.hotelService.listInactiveHotels();

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: "LETTER",
        bufferPages: true,
        autoFirstPage: false,
      });

      let pageNumber = 0;
      doc.on("pageAdded", () => {
        pageNumber++;

        const bottom = doc.margins.bottom;
        doc.margins.bottom = 0;
        doc.text(
          "Pag." + pageNumber,
          (doc.page.width - 100) * 0.5,
          doc.page.height - 50,
          { width: 100, align: "center", lineBreak: false }
        );
        doc.page.margins.bottom = bottom;
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

      doc.addPage();
      //El contenido va aqui

      const table = {
        title: "Listado de hoteles inactivos",
        headers: ["Nombre", "Cadena", "Categoría", "Dirección", "Provincia"],
        rows: row_inactiveHotels,
      };

      doc.table(table, {
        columnsSize: [350, 350, 350, 350, 350],
      });

      const buffer = [];
      doc.on(
        "data",
        buffer.push.bind(buffer),
        doc.on("end", () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        }),
        doc.end()
      );
    });

    return pdfBuffer;
  }

  //Funciones referentes para los reportes

  //Reporte 8 en el proyecto original
  async listInactiveHotels(): Promise<
    Array<{
      name_hotel: string;
      chain_hotel: string;
      category_hotel: string;
      address_hotel: string;
      province_hotel: string;
    }>
  > {
    return await this.hotelService.listInactiveHotels();
  }
}
