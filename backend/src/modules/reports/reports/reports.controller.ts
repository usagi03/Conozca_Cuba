import { Controller, Get, Res } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { HotelsService } from "src/modules/hotels/service/hotels.service";
import { PackagesService } from "src/modules/packages/service/packages.service";

@Controller("reports")
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly hotelService: HotelsService,
    private readonly packageService: PackagesService
  ) {}

  //Report 1
  @Get("inactive")
  getInactiveHotels() {
    return this.hotelService.listInactiveHotels();
  }

  @Get("pdf/Report1")
  async downloadPDFReport1(@Res() res): Promise<void> {
    const pdfBuffer = await this.reportsService.generateListInactiveHotelsPDF();
    try {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename= inactiveHotels.pdf",
      });
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).send("ERROR OF DOWNLOAD FILE");
    }
  }

  //Reporte 2
  @Get("plan")
  getPackagesIncomePlanPDF() {
    return this.packageService.list_of_packages_sales_income_plan();
  }

  @Get("pdf/Report2")
  async downloadPDFReport2(@Res() res): Promise<void> {
    const buffer =
      await this.reportsService.generateListOfPackagesIncomePlanPDF();
    try {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename= incomePlan.pdf",
      });
      res.send(buffer);
    } catch (error) {
      res.status(500).send("ERROR OF DOWNLOAD FILE");
    }
  }

  //Reporte 3
  @Get("pdf/Report3")
  async downloadPDFReport3(@Res() res): Promise<void> {
    try {
      const buffer =
        await this.reportsService.generateListOfPackagesItineraryPDF();
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename= packageItinerary.pdf",
      });
      res.send(buffer);
    } catch (error) {
      res.status(500).send("ERROR OF DOWNLOAD FILE");
    }
  }

  //Reporte 4
  @Get("active")
  getActiveHotels() {
    return this.hotelService.listOfActiveHotel();
  }

  @Get("pdf/Report4")
  async downloadPDFReport4(@Res() res): Promise<void> {
    try {
      const buffer = await this.reportsService.generateListOfActiveHotelsPDF();

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename= inactiveHotels.pdf",
      });
      res.send(buffer);
    } catch (error) {
      res.status(500).send("ERROR OF DOWNLOAD FILE");
    }
  }
}
