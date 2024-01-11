import { IsUUID } from "class-validator";

export class IdValidationDTO {
    @IsUUID()
    id: string
}