import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { animate, trigger, style, transition } from '@angular/animations';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public title: String = 'Todo List';
  todos: Todo[] = [];
  doneTodos: Todo[] = [];
  allTodos: Todo[] = [];
  todo: Todo;
  @Input() color: string;
  currentColor: string;
  arraySize: number;
  constructor(private apiService: ApiService) { 


  }


  ngOnInit() {
    this.apiService
      .getTodos()
      .subscribe((todoData) => {
        this.todos = this.todos.concat(todoData);
        this.filterTodos()
        this.arraySize = this.todos.length
        console.log(this.arraySize) 
      })

  }
  

  deleteApiTodo(todo: Todo){
    this.apiService
    .deleteTodo(todo)
    .subscribe(
      () => (this.todos) = this.todos.filter((t) => t.id != todo.id))
    
  }

  addApiTodo(new_todo: Todo){
    this.apiService
    .addTodo(new_todo)
    .subscribe(todo => this.todos.push(todo))
  }


  finishApiTodo(todo: Todo){
    this.apiService
    .finishTodo(todo)
    .subscribe((todo) => todo.done = true)
  }

  filterTodos(){
    this.doneTodos = this.todos.filter(todo => todo.done == true)
  }
}
