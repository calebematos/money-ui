import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    public translateService: TranslateService
    ) { }

  public ngOnInit(): void {
    let browserlang = this.translateService.getBrowserLang();
    console.log(">>>>>browserlang",browserlang);
    this.translateService.setDefaultLang(browserlang);
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
