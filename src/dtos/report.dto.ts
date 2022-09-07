import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  source: string;
}

//exclude is going to allow us to exclude certain properties inside of our object that we want to return
export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
  
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
