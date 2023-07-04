import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(private http: HttpClient) { }

  getAll(url: string, paramVal?: any): Observable<any[]> {
    const options = { params: paramVal };
    return this.http.get<any[]>(url, options);
  }

  getById(url: string, id: number | string): Observable<any> {
    return this.http.get<any>(`${url}/${id}`);
  }
  delete(url: string): Observable<any[]> {
    return this.http.delete<any>(url);
  }
  post(data: any, url: string): Observable<any[]> {
    return this.http.post<any[]>(url, data);
  }
  put(data: any, url: string): Observable<any[]> {
    return this.http.put<any[]>(url, data);
  }
}
