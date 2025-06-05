import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonButton } from '@ionic/angular/standalone';
import socket from 'socket.io-client'
import { ActivatedRoute } from '@angular/router'
import { AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


export interface UserInfo { code: string; user_name: string; email: string; };


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonImg, IonButton]
})
export class GamePage implements OnInit {

  public random_damage_mult: number = 0;
  public damage: number = 0;
  public heal: number = 0;
  public defense: number = 0;
  public action: any = []
  public game_data: any = [];
  public info: UserInfo ;
  public user_list: any = [];
  public socket: any;
  public player: any;
  public url = 'http://localhost:3000';

  constructor(private route: ActivatedRoute, private alertController: AlertController,  private router: Router) {

    this.socket = socket(this.url);

    let params: any = this.route.snapshot.params;

    this.player = JSON.parse(params.player);

    this.info = {
      code: params.room,
      user_name: this.player.name,
      email: this.player.emails
    };
  }

  ngOnInit() {

    console.log(this.route.snapshot.params)

    console.log(`Esto es this.info ${JSON.stringify(this.info)}`)

    this.socket.emit('join room', this.info);

    this.socket.on('user_list_' + this.info.code, (userList: string[]) => {
      console.log(`user list: ${userList}`)
      this.user_list = userList;
    })

    this.socket.on('game started' + this.info.code, (gamedata: string[]) => {
      console.log(`game started: ${JSON.stringify(gamedata)}`)
      this.game_data = gamedata;
    })

    this.socket.on('finished_turn' + this.info, (gamedata: string[]) => {
      console.log(`next turn: ${JSON.stringify(gamedata)}`)
      this.game_data = gamedata;
      console.log(`GAMEDATA AFTER END TURN:` + JSON.stringify(this.game_data))
      this.gameOver();
    })



  }

    async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Has ganado la batalla!',
      message: '¡Bien luchado guerrero!',
      buttons: ['Cerrar'],
    });

    

    await alert.present();
  }

      async presentAlertlose() {
    const alert = await this.alertController.create({
      header: '¡Has perdido la batalla!',
      message: '¡Bien intentado guerrero!',
      buttons: ['Cerrar'],
    });

    

    await alert.present();
  }

  start() {
    this.socket.emit('start game' + this.info.code, this.user_list)
  }

  turn(hability: number) {

    console.log('PLAYER STATS:' + JSON.stringify(this.player))
    console.log('HABILITY:' + hability)

    if (hability === 2) {
      this.heal = 20;
    } 
    if (hability === 1) {
      this.random_damage_mult = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      this.damage = 100 * this.random_damage_mult
      console.log('PLAYER DAMAGE:' + this.damage)
    } 
    if (hability == 3) {
      this.defense = 20
    } 
    if (hability == 4) {
      this.random_damage_mult = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
      this.damage = this.random_damage_mult * 200
    }
    this.end_turn()
  }
  end_turn() {
    this.action = {
      name: this.player.name,
      heal: this.heal,
      damage: this.damage,
      defense: this.defense
    };
    console.log('ACTION:' + JSON.stringify(this.action))
    this.socket.emit('turn' + this.info.code, this.action)
    this.action = {
      name: this.player.name,
      heal: 0,
      damage: 0,
      defense: 0     
    }
    this.defense = 0
    this.heal = 0
    this.damage = 0
  }

  gameOver(){
    if ( this.game_data.game.game_finished === true && this.game_data.game.game_over === false ){
      this.presentAlert()
      console.log('VICTORIAAAAAAAAAAA')
      this.router.navigate(['/home'])
    } else if ( this.game_data.game.game_finished === true && this.game_data.game.game_over === true ){
      this.presentAlertlose()
      this.router.navigate(['/home'])
    }
  }

}
