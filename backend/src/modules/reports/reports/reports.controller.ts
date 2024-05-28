import { Controller, Get, Res, Param } from "@nestjs/common";
import { ReportsService } from "./reports.service";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /*  @Get("something")
    async getPdf(
        @Res() response: Response,
        @Request() req,
        @Body() auxiliar: any
    ){  const report = await this.reportsService.;
        response.setHeader('Content-Description', 'File Transfer');
        response.setHeader('Content-Length', report.length);
        response.setHeader('Content-type', 'application/octet-stream');
        response.setHeader('Content-type', 'application/pdf');
        response.setHeader('Content-Type', 'application/force-download');
        response.setHeader('Content-disposition', 'attachment;filename=report.pdf');
        response.send(report);
    }*/

  @Get("pdf/Report1")
  async downloadPDFReport1(@Res() res): Promise<void> {
    const pdfBuffer = await this.reportsService.generateListInactiveHotelsPDF();
    try{
   

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename= inactiveHotels.pdf",
     
    });
    res.send(pdfBuffer) }
    catch(error){
      console.error(error);
      
    };
    
  }

  //Reporte 2
  @Get("pdf/Report2")
  async downloadPDFReport2(@Res() res): Promise<void> {
    const buffer =
      await this.reportsService.generateListOfPackagesIncomePlanPDF();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename= incomePlan.pdf",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  }
  //Reporte 3
  @Get("pdf/Report3")
  async downloadPDFReport3(@Res() res): Promise<void> {
    const buffer =
      await this.reportsService.generateListOfPackagesItineraryPDF();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename= packageItinerary.pdf",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  }

  //Reporte 4
  @Get("pdf/Report4")
  async downloadPDFReport4(
    @Param("chain") chain: string,
    @Param("province") province: string,
    @Res() res
  ): Promise<void> {
    const buffer = await this.reportsService.generateListOfActiveHotelsPDF(
      chain,
      province
    );

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename= inactiveHotels.pdf",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  }
}
