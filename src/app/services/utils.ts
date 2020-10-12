import * as moment from 'moment';

export class utils{
    static elapsedTime (endtime: Date , startTime: Date){
       var dif = endtime.getTime() - startTime.getTime()
        var du = moment.duration(dif, "milliseconds");
        var d =  Math.round(du.days() +( du.months() * 30) + (du.years() *365 )).toString(); 
        var h =  String("000" + Math.round(du.hours()).toString()).slice(-2);
        var m =  String("000" + Math.round(du.minutes()).toString()).slice(-2);
        var s =  String("000" + Math.round(du.seconds()).toString()).slice(-2);
        return d + 'd ' + h + ':' + m + ':' + s
      }
}

