import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import socket from 'socket.io-client'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit {

  public socket: any;
  public url = 'http://localhost:3000';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.socket = socket(this.url);

    console.log(this.route.snapshot.params)
  }

}
