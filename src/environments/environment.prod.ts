
var base : string = 'http://localhost:3000'
 
export const environment = {
  production: true,
  wsurl: 'ws://localhost:4000/',
  deleteOrderUrl: base + '/deleteOrder/',
  cancelOrderUrl: base + '/cancelOrder/'
};
