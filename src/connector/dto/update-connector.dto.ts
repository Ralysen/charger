import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateConnectorDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  priority?: boolean;
}
