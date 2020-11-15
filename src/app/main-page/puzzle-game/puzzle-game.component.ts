import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinates } from '../../interfaces/Coordinates';
import { ImageSize } from '../../interfaces/ImageSize';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.less']
})

export class PuzzleGameComponent implements OnInit, AfterViewInit {
  @ViewChild('puzzleCanvas', {static: false}) canvasRef: ElementRef;

  // Canvas 2d context
  private context: CanvasRenderingContext2D;

  public boardParts: any;
  public boardSize: number = 0;
  public tileCount: number = 3;
  public tileSize: number = 0;

  public imageSize: ImageSize = {height: 480, width: 480};

  public clickLoc : Coordinates = {x: 0, y: 0};
  public emptyLoc : Coordinates = {x: 0, y: 0};

  public isSolved : boolean = false;

  public img = new Image();
  public imgSrc = './assets/lithuania.jpg';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.img = new Image();
    this.img.src = this.imgSrc;
  }

  ngAfterViewInit(){
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');

    this.boardSize = this.imageSize.width;
    this.tileSize = this.boardSize / this.tileCount;

    this.img.onload = () =>{
      this.setBoard();
      this.drawTiles();
    }
  }

  /**
   * Clicking on a tile
  */
  public tileClicked(event: MouseEvent){

    this.clickLoc.x = Math.floor((event.pageX - this.canvasRef.nativeElement.offsetLeft) / this.tileSize);
    this.clickLoc.y = Math.floor((event.pageY - this.canvasRef.nativeElement.offsetTop) / this.tileSize);
    if (this.checkDistance(this.clickLoc.x, this.clickLoc.y, this.emptyLoc.x, this.emptyLoc.y) == 1) {
      this.slideTile(this.emptyLoc, this.clickLoc);
      this.drawTiles();
    }
    if (this.isSolved) {
      this.win();
    }
  }

  /**
   *  Navigate to winner page
  */
  public win(){
    this.router.navigate(['winner']);
  }

  /**
   * Setting tile board
  */
  public setBoard(){
    this.boardParts = new Array(this.tileCount);

    for (let i = 0; i < this.tileCount; ++i)
    {
      this.boardParts[i] = new Array(this.tileCount);

      for (let j = 0; j < this.tileCount; ++j) {
        this.boardParts[i][j] = new Object;
        this.boardParts[i][j].x = (this.tileCount - 1) - i;
        this.boardParts[i][j].y = (this.tileCount - 1) - j;
      }
    }

    this.emptyLoc.x = this.boardParts[this.tileCount - 1][this.tileCount - 1].x;
    this.emptyLoc.y = this.boardParts[this.tileCount - 1][this.tileCount - 1].y;
  }

  /**
   * Drawing tiles
  */
  public drawTiles() {

    this.context.clearRect ( 0 , 0 , this.boardSize , this.boardSize );

    for (var i = 0; i < this.tileCount; ++i) {
      for (var j = 0; j < this.tileCount; ++j) {
        var x = this.boardParts[i][j].x;
        var y = this.boardParts[i][j].y;
        if(i != this.emptyLoc.x || j != this.emptyLoc.y || this.isSolved == true) {

            this.context.drawImage(this.img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize,
              i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);

        }
      }
    }
  }

  /**
   * Checking distance between points
  */
  public checkDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  /**
   * Sliding a tile
  */
  public slideTile(toLoc: Coordinates, fromLoc: Coordinates) {
    if (!this.isSolved) {
      this.boardParts[toLoc.x][toLoc.y].x = this.boardParts[fromLoc.x][fromLoc.y].x;
      this.boardParts[toLoc.x][toLoc.y].y = this.boardParts[fromLoc.x][fromLoc.y].y;
      this.boardParts[fromLoc.x][fromLoc.y].x = this.tileCount - 1;
      this.boardParts[fromLoc.x][fromLoc.y].y = this.tileCount - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
      this.checkSolved();
    }
  }

  /**
   * Checking if puzzle is solved
  */
  public checkSolved() {
    let flag = true;
    for (let i = 0; i < this.tileCount; ++i) {
      for (let j = 0; j < this.tileCount; ++j) {
        if (this.boardParts[i][j].x != i || this.boardParts[i][j].y != j) {
          flag = false;
        }
      }
    }
    this.isSolved = flag;
  }
}
