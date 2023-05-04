import { OnInit, Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';



export interface SlideInterface {
  backgroundUrl: string;
  title: string;
  content: string;
  code:string;
}

@Component({
  selector: 'app-ide-slides',
  templateUrl: './ide-slides.component.html',
  styleUrls: ['./ide-slides.component.css']
})
export class IdeSlidesComponent  {
  // @Input() slides: SlideInterface[] = [];

  // 
  @ViewChild('code') private codeExample: ElementRef<HTMLElement>  | any;
  
  public slides: SlideInterface[] |  any[] = [
    { backgroundUrl: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700366562.jpg', 
      title: 'WRITE YOUR NAME!', 
      content: `Let us write our first html code.
      First write the opening tag first <h1>. Second write your name. Now write the closing tag </h1>.
      Finally enjoy your first html code ! `,
      code:"<h1>Your Name</h1> " },
    { backgroundUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUALmIPwTSCAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=', title: 'Page 2', content: 'These are the contents of page 2.' },
    { backgroundUrl: 'https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29saWQlMjBjb2xvcnxlbnwwfHwwfHw%3D&w=1000&q=80', title: 'Page 3', content: 'These are the contents of page 3.'},
    { backgroundUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnsrD0LngDOiRK7JPYbGt11v0z7-8zUIhWQ&usqp=CAU', title: 'Page 4', content: 'These are the contents of page 4.' },
    { backgroundUrl: 'https://t3.ftcdn.net/jpg/02/71/55/56/360_F_271555683_KFGKECe6THmwOw14q3b0ZJGMWL2bpoM0.jpg', title: 'Page 5', content: 'These are the contents of page 5.' },
    { backgroundUrl: 'https://img.freepik.com/free-photo/blue-background_23-2147633356.jpg', title: 'Page 6', content: 'These are the contents of page 6.' },
    { backgroundUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlDvT-20ZqnUu_L4uLIuv9u0UFImbMTXLXw&usqp=CAU', title: 'Page 7', content: 'These are the contents of page 7.' },
  ];



  currentIndex: number = 0;

  goToPrevious(): void {
    if (this.currentIndex != 0) {
      this.currentIndex -= 1;
    }

    
  }

  goToNext(): void {
    if (this.currentIndex != this.slides.length - 1) {
      this.currentIndex += 1;
    }
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
    
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].backgroundUrl}')`;
  }



}
