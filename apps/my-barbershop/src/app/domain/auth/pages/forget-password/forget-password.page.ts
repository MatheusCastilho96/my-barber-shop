import { Component, inject, model } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { injectSupabase } from '@shared/functions/inject-supabase.function';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '@shared/services/loading/loading.service';

@Component({
  selector: 'mb-forget-password',
  imports: [FormsModule, NzButtonComponent, NzFormModule, NzInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.page.html',
  styleUrl: './forget-password.page.scss',
})
export class ForgetPasswordPage {
  private supabase = injectSupabase();
  private notificationService = inject(NzNotificationService);
  loadingService = inject(LoadingService);
  email = model('');

  async submit() {
    this.loadingService.start();
    await this.supabase.auth.resetPasswordForEmail(this.email());
    this.notificationService.success('Sucesso', 'Verifique seu email para redefinir sua senha');
    this.email.set('');
    this.loadingService.stop();
  }
}
