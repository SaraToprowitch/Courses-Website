import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'learningWay',
  standalone: true
})
export class LearningWayPipe implements PipeTransform {

  transform(learningWay: any): any {
    console.log(learningWay);
    
    switch (learningWay) {
      case 0:
        return 'pi pi-video';
      case 1:
        return 'pi pi-users';
      default:
        return '';
    }
  }

}
