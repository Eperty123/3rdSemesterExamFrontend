import { Time } from "@angular/common";
import { UserDto } from "./user-dto";

export interface CoachDto extends UserDto {
    startTime : string;
    endTime : string;
}
