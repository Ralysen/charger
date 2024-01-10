import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateConnectorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  priority: boolean;
}
