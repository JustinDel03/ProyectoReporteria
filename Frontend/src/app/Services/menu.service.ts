import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Menu } from 'app/interfaces/menu.interface';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = `${environment.apiUrl}/api/menus`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los menús disponibles para un usuario según su ID.
   * @param userId - ID del usuario.
   * @returns Observable con la lista de menús.
   */
  getMenusByUser(userId: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/${userId}`);
  }
}
