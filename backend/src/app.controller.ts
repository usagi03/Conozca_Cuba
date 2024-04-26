import { AppService } from "./app.service";
import {
  Controller /*Get*/,
  Body,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
import { SampleDto } from "./sample.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @UseInterceptors(FileInterceptor("file"))
  @Post("file")
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post("file/pass-validation")
  uploadFileAndPassValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "json",
        })
        .build({
          fileIsRequired: false,
        })
    )
    file?: Express.Multer.File
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post("file/fail-validation")
  uploadFileAndFailValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: "jpg",
        })
        .build()
    )
    file: Express.Multer.File
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
