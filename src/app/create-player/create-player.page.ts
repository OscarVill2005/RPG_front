import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.page.html',
  styleUrls: ['./create-player.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton, IonCol, IonGrid, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonImg]
})
export class CreatePlayerPage implements OnInit {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  public health_points = 100
	public mana_points = 100
	public strength = 100
	public magical_damage = 100
	public critical_chance = 1
	public critical_damage = 2
	public defense = 100
  public experience = 0
	public level = 1
	public currency = 0
  public player: any
  public user: any
  public url = 'https://rpg-back-dcpr.onrender.com'

  ngOnInit() {
      this.auth.user$.subscribe((data) => {
      this.user = data
      console.log(`Este es el user ${this.user}`);
      this.player = {
        email : this.user.email,
        name : this.user.nickname
      }
      console.log(this.player)
    })

  }

  selectMago(){

    this.mana_points = 200
    this.strength = 30
    this.defense = 50
    this.magical_damage = 200

    let body = {
      id: this.player.email,
      name: this.player.name,
      health_points: this.health_points,
      mana_points: this.mana_points,
      strength: this.strength,
      magical_damage: this.magical_damage,
      critical_chance: this.critical_chance,
      critical_damage: this.critical_damage,
      defense: this.defense,
      experience: this.experience,
      level: this.level,
      currency: this.currency
    }
    this.http.post(this.url + '/player', body).subscribe((response : any) => {
      console.log(response)
    })
    this.router.navigate( ['/home'])
  }

  selectHealer(){

    this.health_points = 80
    this.mana_points = 150
    this.strength = 20
    this.magical_damage = 150
    this.defense = 50

    let body = {
      id: this.player.email,
      name: this.player.name,
      health_points: this.health_points,
      mana_points: this.mana_points,
      strength: this.strength,
      magical_damage: this.magical_damage,
      critical_chance: this.critical_chance,
      critical_damage: this.critical_damage,
      defense: this.defense,
      experience: this.experience,
      level: this.level,
      currency: this.currency
    }
    this.http.post(this.url + 'player', body).subscribe((response : any) => {
      console.log(response)
    })
    this.router.navigate( ['/home'])
  }

  selectFighter(){

    this.health_points = 200
    this.mana_points = 50
    this.strength = 150
    this.magical_damage = 20
    this.defense = 175
    this.critical_damage = 2

    let body = {
      id: this.player.email,
      name: this.player.name,
      health_points: this.health_points,
      mana_points: this.mana_points,
      strength: this.strength,
      magical_damage: this.magical_damage,
      critical_chance: this.critical_chance,
      critical_damage: this.critical_damage,
      defense: this.defense,
      experience: this.experience,
      level: this.level,
      currency: this.currency
    }
    this.http.post(this.url + 'player', body).subscribe((response : any) => {
      console.log(response)
    })
    this.router.navigate( ['/home'])
  }

}
