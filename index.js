const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const routerClient = require('./router/client/index.router.js');
const routerAdmin = require('./router/admin/index.router.js');
const bodyParser = require('body-parser')
const mongoose = require('./configs/database.js');
const systemAdmin = require('./configs/system.js');
var methodOverride = require('method-override');
const app = express();
// [Express] Thiết lập thư mục views chứa các file giao diện Pug
app.set("views", "./views");
// [Express] Thiết lập Pug làm template engine
app.set("view engine", "pug");
// [Express] Dùng để phục vụ các file tĩnh như ảnh, CSS, JS trong thư mục 'public'
app.use(express.static("public"));
// [Express] Gán biến toàn cục cho view engine (truy cập được từ mọi template pug)
app.locals.systemAdmin = systemAdmin.ADMINROUTER;
// [method-override] Hỗ trợ dùng method PUT và DELETE từ HTML form thông qua query `_method`
app.use(methodOverride('_method'));
// [Express] Cho phép xử lý JSON payload từ body request
app.use(express.json());
// [body-parser] (hoặc Express >= 4.16) Xử lý form có content-type là application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect();
routerAdmin(app);
routerClient(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  