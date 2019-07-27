import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { timer, fromEvent } from 'rxjs';
import { Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'rt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  menuActive = false;
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  title = 'portfolio';
  curr = 0;
  finish = 500;
  x = 10;
  y = 10;
  raf = window.requestAnimationFrame;

  constructor(private router: Router) {

  }

  ngOnInit() {
    fromEvent(window, 'resize').subscribe(e => this.resizeCanvas());
    this.router.events.subscribe(e => {
      if(e instanceof ActivationStart) {
        this.menuActive = false;
      }
    })
  }

  ngAfterViewInit() {
    window.requestAnimationFrame = this.raf;
    this.generateCanvas();
  }

  generateCanvas() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    this.canvasElement = this.canvas.nativeElement;
    this.ctx = this.canvasElement.getContext('2d');
    this.canvasElement.width = windowWidth;
    this.canvasElement.height = windowHeight;
    this.ctx.fillStyle = '#17223b';
    this.ctx.fillRect(0, 0, windowWidth, windowHeight);

    timer(0, 500).subscribe(e => {
      if (!document.hidden) {
        for (let i = 0; i < 5; i++) {
          const size = this.randomNumber(0.5, 2);
          const xOffset = this.randomNumber(1.5, 1.8);
          const yOffset = this.randomNumber(1.5, 1.8);
          const y = 0;
          const x = this.randomNumber(1, window.innerWidth / 2);
          this.animate(size, xOffset, yOffset, x > y ? x : 0, y > x ? y : 0);
        };
      }
    });
  }

  animate(size: number, xOffset: number, yOffset: number, x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#17223b';
    this.ctx.fillRect(x - xOffset - 10, y - yOffset - 10, size + 10, size + 10);
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fillStyle = '#6b778d';
    this.ctx.fill();
    x += (xOffset);
    y += (yOffset);
    this.curr += 1;

    if (x < window.innerWidth + 4 && y < window.innerHeight + 4) {
      requestAnimationFrame(() => {
        this.animate(size, xOffset, yOffset, x, y);
      });
    }
  }

  private randomNumber(min: number, max: number): number {
    return (Math.random() * (max - min + 1) );
  }

  private resizeCanvas(): void {
    this.canvasElement.width = window.innerWidth;
    this.canvasElement.height = window.innerHeight;
    this.ctx.fillStyle = '#17223b';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }
}
