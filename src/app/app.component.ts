import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryDrawerService } from './services/secondary-drawer.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ledgerkeep-fe';

  @ViewChild('secondaryDrawer') secondaryDrawer: MatDrawer | undefined;

  constructor(public router: Router, public secondaryDrawerService: SecondaryDrawerService) {}

  ngAfterViewInit(): void {
    this.secondaryDrawerService.onClose(() => {
      this.secondaryDrawer?.close();
    });

    this.secondaryDrawerService.onToggle(() => {
      this.secondaryDrawer?.toggle();
    });
  }
}
