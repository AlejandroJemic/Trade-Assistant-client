export class BitemxState {
      startTime: Date ;
      runingTime: string;
      bidPrice : number ;
      delay: string;
      max: number;
      maxPercent: number;
      maxDelta: number;
      min: number;
      minPercent: number;
      minDelta: number;
      totalDelta: number;
      totalPercent: number;

      constructor(startTime: any,
      bidPrice :  any,
      delay:  any,
      max:  any,
      maxPercent:  any,
      maxDelta:  any,
      min:  any,
      minPercent:  any,
      minDelta:  any,
      totalDelta:  any,
      totalPercent:  any,){
            this.startTime = startTime;
            this.bidPrice  =  bidPrice;
            this.delay  = delay;
            this.max  = max;
            this.maxPercent = maxPercent;
            this.maxDelta = maxDelta;
            this.min =  min;
            this.minPercent = minPercent ;
            this.minDelta =  minDelta ;
            this.totalDelta = totalDelta ;
            this.totalPercent = totalPercent 
      }
      
      getName() {
      return this.constructor.name;
      }
}

 export enum Commands {
      subscribe  = 'subscribe' ,
      unsubscribe = 'unsubscribe'
}