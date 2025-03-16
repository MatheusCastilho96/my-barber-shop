import { Component, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'mb-login',
  imports: [NzButtonComponent, NzFlexModule, NzFormModule, NzInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private subabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  async login() {
    if (!this.loginForm.valid) {
      this.notificationService.error('Erro', 'Preencha os campos corretamente');
      return;
    }
    const { email, password } = this.loginForm.value;
    const { error } = await this.subabase.auth.signInWithPassword({ email, password });
    if (error) {
      this.notificationService.error('Erro ao fazer o login', error.message);
      return;
    }
    this.router.navigate(['/']);
  }
}
