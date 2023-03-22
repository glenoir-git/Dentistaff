import { TimeWorked } from "./common";
import { Contract } from "./contract";
import { Speciality } from "./speciality";

export interface Environnment {
    name: string;
}

export interface ActivityModel {
    id:string;
    name:string;
    environment:Array<Environnment>;
    avaliableContract:Array<Contract>;
    avaliableTimeWorked:Array<TimeWorked>;
    avaliableSoftware:Array<string>;
    avaliableSpeciality:Array<Speciality>;
    avaliableCertificate:Array<string>;
}