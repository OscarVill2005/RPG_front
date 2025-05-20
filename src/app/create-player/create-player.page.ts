import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.page.html',
  styleUrls: ['./create-player.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CreatePlayerPage implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public player: any
  public url = 'http://localhost:3000'

  ngOnInit() {
      this.auth.user$.subscribe((data) => {
      this.player = data
      console.log(`Este es el user ${this.player}`);
    })

  }

}
