import { timingSafeEqual } from "crypto";

export interface CRUD<T> {
  loadData(): void;
  create(val: any): void;
  editRow(val: number): void;
  deleteRow(val: number): void;
}
export enum ROLES {
  DEVELOPER,
  QA,
  DevOps
}
export class Employee {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  phoneno: any;
  role: ROLES;
  Address: string;
  id:number;
  constructor(firstName:string,middleName:string,lastName:string,email:string,phoneNo:number,role:ROLES,address:string)
  {
    this.FirstName = firstName;
    this.MiddleName = middleName;
    this.LastName = lastName;
    this.Email= email;
    this.phoneno=phoneNo;
    this.role=  role;
    this.Address = address;
  }
}
export class fetchJsonData {
  async fetchData() {
    let jsonResponse = await fetch("http://localhost:3000/fetchJsonData");
    let data = await jsonResponse.json();
    return(data);
  }
} 

