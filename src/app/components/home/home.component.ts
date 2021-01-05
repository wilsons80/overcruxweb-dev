import { ToolbarPrincipalService } from './../../services/toolbarPrincipal/toolbar-principal.service';
import { TempoSessaoService } from './../../services/tempo-sessao/tempo-sessao.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

   constructor(public toolbarPrincipalService: ToolbarPrincipalService) {
  }

  ngOnInit() {
  }
  getBackground() {
    if (this.toolbarPrincipalService && this.toolbarPrincipalService.logo) {
      return `${this.toolbarPrincipalService.logo}`

    }
  }
}




   