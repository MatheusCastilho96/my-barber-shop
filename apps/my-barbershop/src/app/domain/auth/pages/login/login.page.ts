import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';
@Component({
  selector: 'mb-login',
  imports: [NzButtonComponent, TranslocoModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private translocoService = inject(TranslocoService);

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
