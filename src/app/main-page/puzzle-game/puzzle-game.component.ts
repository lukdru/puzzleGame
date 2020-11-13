import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coordinates } from '../../interfaces/Coordinates';
import { ImageSize } from '../../interfaces/ImageSize';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.less']
})

export class PuzzleGameComponent implements AfterViewInit {

  // Reference to the canvas element
  //@ViewChild('puzzleCanvas', {static: false, read: ElementRef}) canvasRef: ElementRef;
  @ViewChild('puzzleCanvas', {static: false}) canvasRef: ElementRef;
  //private canvas: any;

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

  ngAfterViewInit(){
    this.context = (this.canvasRef.nativeElement as HTMLCanvasElement).getContext('2d');

    this.boardSize = this.imageSize.width;
    this.tileSize = this.boardSize / this.tileCount;

    this.img.src = './assets/lithuania.jpg';

    //this.ld(this.img)

    //this.context.lineWidth = 10;


    //his.context.drawImage(this.img, 0, 0, 480, 480);
    // Wall
    //this.context.strokeRect(75, 140, 150, 110);


    this.paintTest(this.context,this.img);

    this.setBoard();
    //this.drawTiles(this.img);

    console.log('After Init')

  }

  async ld(img){
    img = await this.loadImage('./assets/lithuania.jpg');
  }

  loadImage(url) {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
  }

  paintTest(ctx, img){


    img.onload = function(){
      ctx.drawImage(img, 0, 0, 480, 480);

    }

    // img.onload = function(){
    //   for (var i = 0; i < this.tileCount; ++i) {
    //     for (var j = 0; j < this.tileCount; ++j) {
    //       var x = this.boardParts[i][j].x;
    //       var y = this.boardParts[i][j].y;
    //       if(i != this.emptyLoc.x || j != this.emptyLoc.y || this.isSolved == true) {
    //         ctx.drawImage(img, x * 3, y * 3, 3, 3,
    //             i * 3, j * 3);
    //       }
    //     }
    //   }
    // }
  }

  /**
   * Clicking on a tile
  */
  public tileClicked(event: MouseEvent){
    console.log('Çlicked');
    //this.clickLoc.x = Math.floor((event.pageX - this.offsetLeft) / this.tileSize);
    //this.clickLoc.y = Math.floor((event.pageY - this.offsetTop) / this.tileSize);
    if (this.checkDistance(this.clickLoc.x, this.clickLoc.y, this.emptyLoc.x, this.emptyLoc.y) == 1) {
      this.slideTile(this.emptyLoc, this.clickLoc);
      this.drawTiles(this.img);
    }
    if (this.isSolved) {
      this.win();
    }
  }

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
  public drawTiles(img) {
    //this.context.drawImage(img, 0, 0, this.imageSize.width, this.imageSize.height);

    //this.context.drawImage(img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize,
    //  i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
    console.log(this.boardSize);
    // img.onload = function(){
    //   this.context.clearRect ( 0 , 0 , 480 , 480 );
    // }
    this.context.clearRect ( 0 , 0 , this.boardSize , this.boardSize );

    //this.context(c.)
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
