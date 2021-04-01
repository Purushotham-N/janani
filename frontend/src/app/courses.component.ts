import { CoursesService } from './courses.service';
import { Component} from '@angular/core';


@Component({
    'selector':'courses',
    'template':``
})
export class CoursesComponent{
    title = "List of courses";
    courses;

    constructor(coursesService : CoursesService){
       this.courses = coursesService.getCourses();
    }

    isActive = false;
    onDivClicked(){
        console.log("Div was clicked.")
    }

    onSave($event:Event){
        $event.stopPropagation();
        console.log("Button was clicked.",$event);   
    }
    // onKeyUp(email:string){
    //     console.log(email);
    // }

    email = "name@domain.com";
    onKeyUp(){
        console.log(this.email)
    }
    getTitle(){
        return this.title;
    }
}