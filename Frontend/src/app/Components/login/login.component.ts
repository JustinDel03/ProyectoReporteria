import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup;
  mostrarLoading = false;
  ocultarPassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  iniciarSesion(): void {
    if (this.formularioLogin.valid) {
      this.mostrarLoading = true;
      const { email, password } = this.formularioLogin.value;

      this.userService.login(email, password).subscribe({
        next: () => {
          this.mostrarLoading = false;
          this.router.navigate(['/pages']);
        },
        error: (err) => {
          this.mostrarLoading = false;
          console.error('Error al iniciar sesión', err);
        }
      });
    }
  }

  enterUsuario(event: any, passwordInput: HTMLInputElement): void {
    event.preventDefault();  // Evitar el comportamiento por defecto de Enter
    passwordInput.focus();  // Coloca el foco en el campo de contraseña
  }

}
