import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ending-page',
  templateUrl: './ending-page.component.html',
  styleUrls: ['./ending-page.component.less']
})
export class EndingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public restart(){
    this.router.navigate(['']);
  }
}
