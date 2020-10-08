import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import{BitmexService} from './services/bitmex.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    bitmex: BitmexService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  sideMenu()
  {
    this.navigate =
    [
      {
        title : "B",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "O",
        url   : "/orders",
        icon  : "orders"
      },
      {
        title : "P",
        url   : "/pos",
        icon  : "pos"
      }
    ]
  }
}
