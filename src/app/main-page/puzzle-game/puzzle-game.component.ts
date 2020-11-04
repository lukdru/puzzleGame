import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.less']
})

export class PuzzleGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let areaKeys = {
      A: ["B", "D"],
      B: ["A", "C", "E"],
      C: ["B", "F"],
      D: ["A", "E", "G"],
      E: ["B", "D", "F", "H"],
      F: ["C", "E", "I"],
      G: ["D", "H"],
      H: ["E", "G", "I"],
      I: ["F", "H"]
  };
  }

  

}
