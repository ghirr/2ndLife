import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  defaultImage = '/assets/images/avatar.png';
  hoveredImage = '/assets/images/upload.png';

  currentImage = this.defaultImage;

  onHover() {
    this.currentImage = this.hoveredImage;
  }

  onLeave() {
    this.currentImage = this.defaultImage;
  }

}
