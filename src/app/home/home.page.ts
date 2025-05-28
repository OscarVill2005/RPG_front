import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonCol, IonGrid, IonRow, IonImg } from '@ionic/angular/standalone';
import {FormsModule} from '@angular/forms'
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule , IonContent,IonButton, IonCol, IonGrid, IonRow, IonImg ]
})
export class HomePage implements OnInit {

  public player: any
  public url = 'http://localhost:3000'
 
  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe((data: any) => {
      this.player = data;
      console.log(this.player)
      //Check if player exists in DB
      this.http.get(`${this.url}/player/${this.player.email}`).subscribe((response) =>{
      if(response == 'Player not found'){ 
        // If Player doesnt exist create it
        this.router.navigate(['/create-player'])        
      } else { //If player exists

      }
        console.log(response)

      })
    })
  }
}