import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import axios from "axios"

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todos: any[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    axios({
      method:"get",
      url: "https://countriesnow.space/api/v0.1/countries"
    }).then((res) => { 
      //console.log(res.data.data)
      for(const cnt in res.data.data){
        //console.log(res.data.data[cnt].country)
        this.todos.push({
          title:res.data.data[cnt].country
        })
      }
    })
  }

  onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.todoService.addTodo(titleInput.value);
      titleInput.value = "";
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

  cntselect(id:string){
    console.log(id);
    axios({
      method:"get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${id}&APPID=794ee95e63c5a32aaf88cd813fa2e425`
    }).then((res) => { 
      console.log(res.data)
      var results = {
          temp : res.data.main.temp,
          hum : res.data.main.humidity,
          winds : res.data.wind.speed,
          deg : res.data.wind.deg,
          gust : res.data.wind.gust
      }
      console.log(results);
      var ress = "Country : " + id + "\n";
      ress += `Temperature : ${results.temp}\n`;
      ress += `Humidity : ${results.hum}\n`;
      ress += `Wind-Speed : ${results.winds}\n`;
      ress += `Wind-Deg : ${results.deg}\n`;
      ress += `Wind-Gust : ${results.gust}\n`;
      alert(ress);
    })
  }

}
