const container = require('./src/container');
const app = container.resolve('app');

app.start();
// const db = container.resolve('db');
// const Order = require('./src/domain/order');

// const data = {
//   guid: 'xxxx',
//   user_id: '98b9da24-35e1-4452-8cbd-bcbc18b2deaa',
//   items: []
// };

// const order = Order(data);
// // order.addOrderItem(2, 300);
// // order.addOrderItem(3, 100);

// // db.models.Order.create(order);

// const br = require('./src/infrastructure/repositories/book');
// const bws = require('./src/infrastructure/web_services/book');
// const repo = br(bws());

// const orders = [2,7];
// const pms = [];
// orders.map(b => pms.push(repo.getById(b)));
// Promise.all(orders.map(o => repo.getById(o))).then(resp => {
//   console.log(resp);
// });