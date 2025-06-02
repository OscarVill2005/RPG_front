import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import socket from 'socket.io-client'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol]
})
export class GamePage implements OnInit {

  public damage : number = 0;
  public heal : number = 0;
  public defense : number = 0;
  public action : any = []
  public game_data: any = [];
  public info: any
  public user_list: any = [];
  public socket: any;
  public player: any;
  public url = 'http://localhost:3000';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.socket = socket(this.url);

    console.log(this.route.snapshot.params)

    let params: any = this.route.snapshot.params

    this.player = JSON.parse(params.player);

     this.info = {
      code: params.room,
      user_name: this.player.name,
      email: this.player.email
    };

    this.socket.emit('join room', this.info);

    this.socket.on('user_list_' + this.info.code, (userList: string[]) => {
      console.log(`user list: ${userList}`)
      this.user_list = userList;
    })

    this.socket.on('game started' + this.info.code, (gamedata: string[]) =>{
      console.log(`game started: ${gamedata}`)
      this.game_data = gamedata;
    })

    this.socket.on('finished_turn' + this.info.code, (gamedata: string[]) =>{
      console.log(`game started: ${gamedata}`)
      this.game_data = gamedata;})
  }

  start(){
    this.socket.emit('start game' + this.info.code, true)
  }

  turn(hability : string){

  if (hability == 'Heal'){

  } else if (hability == 'Attack'){

  } else if (hability == 'Defend'){

  } else if (hability == "Special"){

  }
}
  end_turn(){
    this.action = {
      name : this.player.name,
      
    };

    this.socket.emit('turn' + this.info.code, this.action )
  }

}
