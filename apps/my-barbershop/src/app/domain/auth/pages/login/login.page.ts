import { Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { ThemeService } from '@shared/services/theme/theme.service';
@Component({
  selector: 'mb-login',
  imports: [NzButtonComponent, NzFlexModule, TranslocoModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private themeService = inject(ThemeService);
  private translocoService = inject(TranslocoService);

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
