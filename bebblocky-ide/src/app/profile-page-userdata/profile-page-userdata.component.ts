import { Component } from '@angular/core';
import { faTachometerAlt, faCode, faUser, faCog, faTableCells, faArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-profile-page-userdata',
  templateUrl: './profile-page-userdata.component.html',
  styleUrls: ['./profile-page-userdata.component.scss']
})
export class ProfilePageUserdataComponent {
  gotoIcon = faArrowRight;
  courses = [
    {
      'title': 'First Course',
      'description': 'Some description about the course. This area will be used to display some interesting facts about a course.',
      'progressPercent': 20,
      'link': '/code'
    },
    {
      'title': 'Second Course',
      'description': 'Some description about the course. This area will be used to display some interesting facts about a course.',
      'progressPercent': 50,
      'link': '/code'
    },
    {
      'title': 'Third Course',
      'description': 'Some description about the course. This area will be used to display some interesting facts about a course.',
      'progressPercent': 90,
      'link': '/code'
    }
  ]
}
