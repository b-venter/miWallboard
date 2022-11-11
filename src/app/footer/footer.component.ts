import { Component, OnInit } from '@angular/core';

import packageJson from '../../../package.json';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public version: string = packageJson.version;

  constructor() { }

  ngOnInit(): void {
  }

}