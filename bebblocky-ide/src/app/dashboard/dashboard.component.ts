import { Component } from '@angular/core';
import { Slide } from '../shared/models/slide.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public slide: Slide = {
    slideId: 1,
    courseName: 'Introduction to Web Development',
    courseCategory: 'html',
    slides: [{
      backgroundColor: '#ffffff',
      font: 'Arial',
      title: 'What is Web Development?',
      content: 'Web development is the process of creating websites and web applications using technologies such as HTML, CSS, and JavaScript.',
      code: '<html>\n  <head>\n    <title>Hello, World!</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n  </body>\n</html>',
      image: 'https://example.com/images/slide1.jpg'
    }]
  };
}
