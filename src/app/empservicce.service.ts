import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpservicceService {

  
 /* private sourceUrl: string;
  

 
  constructor(private http: HttpClient) {
    this.sourceUrl = 'http://localhost:3000/emp';
    
  }
 
  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.sourceUrl);
  }
 
  public save(employee: Employee) {
    return this.http.post<Employee>(this.sourceUrl, employee);
  }


  public getById(id: number) {
   const url=`${this.sourceUrl}/${id}`;
    return this.http.get<Employee[]>(url);
  }


  public deleteById(idNum:number){
    const url=`${this.sourceUrl}/${idNum}`;
    return this.http.delete<Employee[]>(url);
  }


  public updateById(id:number,empl:Employee){
    const url=`${this.sourceUrl}/${id}`;
    return this.http.put<Employee>(url,empl);

  }*/
}
