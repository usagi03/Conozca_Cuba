import { Controller, Get, Res } from "@nestjs/common";
import { ReportsService } from "./reports.service";
//import { Response } from "express";

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

  @Get("pdf/download")
  async downloadPDFReport1(@Res() res): Promise<void> {
    const buffer = await this.reportsService.generatePDF();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename= inactiveHotels.pdf",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  }
}
