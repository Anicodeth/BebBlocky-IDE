import { Component, Input } from '@angular/core';

export interface SlideInterface {
  backgroundUrl: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-ide-slides',
  templateUrl: './ide-slides.component.html',
  styleUrls: ['./ide-slides.component.css']
})
export class IdeSlidesComponent {
  // @Input() slides: SlideInterface[] = [];

  // 
  
  public slides: SlideInterface[] = [
    { backgroundUrl: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700366562.jpg', title: 'Page 1', content: 'This are the contents of page 1.' },
    { backgroundUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUALmIPwTSCAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=', title: 'Page 2', content: 'This are the contents of page 2.' },
    { backgroundUrl: 'https://images.unsplash.com/flagged/photo-1593005510329-8a4035a7238f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29saWQlMjBjb2xvcnxlbnwwfHwwfHw%3D&w=1000&q=80', title: 'Page 3', content: 'This are the contents of page 3.'},
    { backgroundUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnsrD0LngDOiRK7JPYbGt11v0z7-8zUIhWQ&usqp=CAU', title: 'Page 4', content: 'This are the contents of page 4.' },
    { backgroundUrl: 'https://t3.ftcdn.net/jpg/02/71/55/56/360_F_271555683_KFGKECe6THmwOw14q3b0ZJGMWL2bpoM0.jpg', title: 'Page 5', content: 'This are the contents of page 5.' },
    { backgroundUrl: 'https://img.freepik.com/free-photo/blue-background_23-2147633356.jpg', title: 'Page 6', content: 'This are the contents of page 6.' },
    { backgroundUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlDvT-20ZqnUu_L4uLIuv9u0UFImbMTXLXw&usqp=CAU', title: 'Page 7', content: 'This are the contents of page 7.' },
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
