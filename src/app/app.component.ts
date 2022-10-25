import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: String = 'Todo List';
  public tasks: Task[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required
      ])],
    });
  
    this.loadPreviousTasks()
  }

  addTask(){
    const id = this.tasks.length + 1
    const title = this.form.controls['title'].value
    const category = this.form.controls['category'].value
    const done = false


    this.tasks.push(new Task(id, title, category, done))
    this.savingOnLocal()
    this.erasePreviousData()
    
  }

  removeTask(task: Task): void {
    const taskIndex = this.tasks.indexOf(task)
    if(taskIndex != -1){
      this.tasks.splice(taskIndex, 1)
      const localData = JSON.parse(localStorage.getItem("tasks"))
      localData.splice(taskIndex,1)
      
      const attData = JSON.stringify(localData)
      localStorage.setItem("tasks", attData)

    } 
  
  }

  finishTask(task: Task){
    task.done = true
  }

  reopenTask(task: Task){
    task.done = false
  }

  erasePreviousData(){
    this.form.reset()
  }

  savingOnLocal(){
    const localData = JSON.stringify(this.tasks)
    localStorage.setItem("tasks", localData)
  }

  loadPreviousTasks(){
    const data = localStorage.getItem("tasks")
    if(data){
      this.tasks = JSON.parse(data)
    } else {
      this.tasks = []
    }
    
  }
}
