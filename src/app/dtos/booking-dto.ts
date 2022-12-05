import { Time } from "@angular/common";
import { ClientDto } from "./client-dto";
import { CoachDto } from "./coach-dto";

export interface BookingDto {
    id : number;
    date : Date;
    clientId : number;
    coachId : number;
    client? : ClientDto;
    coach? : CoachDto;
}