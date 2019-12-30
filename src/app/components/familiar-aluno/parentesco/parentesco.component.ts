import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input } from '@angular/core';
import { SituacaoParentesco } from 'src/app/core/situacao-parentesco';

@Component({
  selector: 'parentesco',
  templateUrl: './parentesco.component.html',
  styleUrls: ['./parentesco.component.css']
})
export class ParentescoComponent implements OnInit {

  @Input() familiar: Familiares;

  situacaoParentesco: SituacaoParentesco = new SituacaoParentesco();

  constructor() { }

  ngOnInit() {
  }

}