import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonRow, IonGrid, IonCol, IonImg } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonRow, IonGrid, IonCol, IonImg]
})
export class LoginPage implements OnInit {
 
  public player: any;
  constructor(private auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  ngOnInit() {
    this.auth.user$.subscribe((data) => {
      this.player = data
      console.log(`Este es el user ${this.player}`);
    })

  }

  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: 'home'
      }
    });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

}
