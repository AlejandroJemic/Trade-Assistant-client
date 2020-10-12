import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import{BitmexService} from './services/bitmex.service'
import { BitmexOrder } from './models/bitmex.model';
import { utils } from './services/utils';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  Orders: BitmexOrder[] = [] ;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private bitmexServ: BitmexService
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.readOrdersFromStorage();
      this.setOrdersOnOrdesUpdated();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "H",
        url   : "/home",
      },
      {
        title : "O",
        url   : "/orders",
      },
      {
        title : "P",
        url   : "/pos",
      },
      {
        title : "M",
        url   : "/mesages",
      },      {
        title : "W",
        url   : "/walet",
      },
    ]
  }

  private setOrdersOnOrdesUpdated()
  {
    this.bitmexServ.onOrdersUpdated().subscribe( data => {
      this.UpdateOrders(data);
      this.saveOrders();
    });
  }


  private UpdateOrders(data: any) {
    console.log('orders updated')  
    if (data && data.length > 0) {
      var match = false;
      try {
        data.forEach((dataOrder, index) => {
          match = false;
          if (this.Orders && this.Orders.length > 0) {
            var findedOrder = this.Orders.find((order) => { return order.orderID === dataOrder.orderID; });
            if (findedOrder) {
              match = true;
              findedOrder.orderID = dataOrder.orderID;
                findedOrder.ordType = dataOrder.ordType;
                findedOrder.orderQty = dataOrder.orderQty;
                findedOrder.ordStatus = dataOrder.ordStatus;
                findedOrder.symbol = dataOrder.symbol;
                findedOrder.leavesQty = dataOrder.leavesQty;
                findedOrder.side = dataOrder.side;
                findedOrder.stopPx = dataOrder.stopPx;
                findedOrder.price = dataOrder.price;
                findedOrder.avgPx = dataOrder.avgPx;
                findedOrder.currency =  dataOrder.currency;
                findedOrder.timestamp = dataOrder.timestamp;
            };
          }
          if (!match) {
            this.Orders.push(new BitmexOrder(
              dataOrder.orderID,
              dataOrder.ordType,
              dataOrder.orderQty,
              dataOrder.ordStatus,
              dataOrder.symbol,
              dataOrder.leavesQty,
              dataOrder.side,
              dataOrder.stopPx,
              dataOrder.price,
              dataOrder.avgPx,
              dataOrder.currency,
              dataOrder.timestamp,
              utils.elapsedTime(new Date(), new Date(dataOrder.timestamp))
            ));
          }
        });

      }
      catch (err) {
        console.log('Error: ' + err);
      }
    }
    else if((!data || data.length === 0) &&(this.Orders && this.Orders.length > 0)){
      this.Orders = [];
    }
  }

  private saveOrders(){
    this.bitmexServ.saveToStoraje(BitmexOrder.name, this.Orders);
    this.bitmexServ.setOrders(this.Orders);
  }

  private readOrdersFromStorage(){
    var savedOrders :BitmexOrder[] = this.bitmexServ.readFromStorage(BitmexOrder.name);
    if(savedOrders)
    this.Orders = savedOrders;
  }
}
