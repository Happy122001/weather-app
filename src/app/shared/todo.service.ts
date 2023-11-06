import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import axios from "axios"
//https://api.openweathermap.org/data/2.5/weather?q=Algeria&APPID=794ee95e63c5a32aaf88cd813fa2e425


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection : AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
   }

   addTodo(title: string){
     this.firestoreCollection.add({
       title,
       isDone : false
     })
   }

   updateTodoStatus(id:string, newStatus:boolean){
     this.firestoreCollection.doc(id).update({isDone:newStatus});
   }

   deleteTodo(id:string){
     this.firestoreCollection.doc(id).delete();
   }

}
