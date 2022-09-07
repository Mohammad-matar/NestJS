import {
  IsOptional,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';

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
