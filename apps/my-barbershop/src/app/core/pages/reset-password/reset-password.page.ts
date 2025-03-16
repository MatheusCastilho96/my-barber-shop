import { Component, inject, model } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'mb-reset-password',
  imports: [FormsModule, NzButtonComponent, NzFormModule, NzInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.page.html',
  styleUrl: './reset-password.page.scss',
})
export class ResetPasswordPage {
  private supabase = injectSupabase();
  password = model('');
  private notificationService = inject(NzNotificationService);
  private router = inject(Router);
  async submit() {
    await this.supabase.auth.updateUser({ password: this.password() });
    this.notificationService.success('Sucesso', 'Senha redefinida com sucesso');
    this.password.set('');
    this.router.navigate(['/']);
  }
}
