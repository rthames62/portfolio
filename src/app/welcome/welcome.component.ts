import { Component, OnInit, AfterViewInit } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'rt-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  welcome = '';
  title = '';
  showWelcomeTyping = true;
  showTitleTyping = false;
  typingCompleted = false;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const welcomeText = `Hi, I'm Ryan`;
    const titleText = `Front-End / Software Engineer`;

    timer(1000, 70).pipe(take(welcomeText.length + 1)).subscribe(e => {
      this.welcome = welcomeText.slice(0, e);
      if (this.welcome === welcomeText) {
        setTimeout(() => {
          this.showWelcomeTyping = false;
        }, 1000);
      }
    });

    timer(3000, 70).pipe(take(titleText.length + 1)).subscribe(e => {
      this.showTitleTyping = true;
      this.title = titleText.slice(0, e);
      if (this.title === titleText) {
        this.typingCompleted = true;
      }
    });
  }
}
