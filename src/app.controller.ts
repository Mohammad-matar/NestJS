import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode, //return a specific response like 200 we can change it to 205
  ParseUUIDPipe, //using for the ids // what Pipe does saying if the id is a number or string in console log and if it has a bad requrest or not its for validation
  ParseEnumPipe, // using for the types // if the something wrong in the api like banana instead of income or expense it will say that is not valid
} from '@nestjs/common';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';
import { ReportType } from 'src/data';
// import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReport(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    console.log(body);
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body);
  }
  @HttpCode(204)
  @Delete(':id')
  deletedReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
