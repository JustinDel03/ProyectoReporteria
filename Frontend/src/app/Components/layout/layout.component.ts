import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../../Services/sidenav.service';
import { UserService } from '../../Services/user.service';
import { MenuService } from '../../Services/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  listaMenus: any[] = [];

  constructor(
    private sidenavService: SidenavService,
    private userService: UserService,
    private menuService: MenuService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerMenus();
  }

  obtenerMenus(): void {
    const userId = this.userService.getUserId();

    if (userId) {

      this.menuService.getMenusByUser(userId).subscribe({
        next: (menus) => {
          this.listaMenus = menus;
        },
        error: (err) => {
          console.error('Error al obtener los menús', err);
        }
      });
    } else {
      console.error('ID del usuario no encontrado');
    }
  }

  toggleSidenav(): void {
    this.sidenavService.toggle();
  }
  cerrarSesion(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  getIconColor(icono: string): string {
    return 'black';
  }
}


