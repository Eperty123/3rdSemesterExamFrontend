export interface UpdateUserDto {
    id : number;
    oldPassword : string;
    password : string;
    description: string;
}