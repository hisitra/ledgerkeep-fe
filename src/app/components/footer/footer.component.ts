import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnInit {
  public linkedin = 'https://www.linkedin.com/in/shivanshk';
  public author = 'Shivansh Kuchchal';

  constructor() {
    /* No empty functions allowed. */
  }

  ngOnInit(): void {
    /* No empty functions allowed. */
  }
}
