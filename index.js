const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const routerClient = require('./router/client/index.route.js');
const routerAdmin = require('./router/admin/index.route.js');
const mongoose = require('./configs/database.js');
const systemAdmin = require('./configs/system.js')
var flash = require('express-flash');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var methodOverride = require('method-override');
const moment = require('moment');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
mongoose.connect();
// [Express] Thiết lập thư mục views chứa các file giao diện Pug
app.set("views", `${__dirname}/views`);
// [Express] Thiết lập Pug làm template engine
app.set("view engine", "pug");
// [Express] Dùng để phục vụ các file tĩnh như ảnh, CSS, JS trong thư mục 'public'
app.use(express.static(`${__dirname}/public`));
// [Express] Gán biến toàn cục cho view engine (truy cập được từ mọi template pug)
app.locals.systemAdmin = systemAdmin.ADMINROUTER;
// [Express] Cho phép xử lý JSON payload từ body request
app.use(express.json());
//END
// [method-override] Hỗ trợ dùng method PUT và DELETE từ HTML form thông qua query `_method`
app.use(methodOverride('_method'));
//END
// [body-parser] (hoặc Express >= 4.16) Xử lý form có content-type là application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//END
//[express-flash] để hiển thị thông báo nhanh 
//[cookie-parser]giúp phân tích cookie từ client gửi lên và gán vào req.cookies
//[express-session] để lưu dữ liệu tạm 
app.use(cookieParser('hentaivn'));
app.use(session({
    secret: process.env.SESSION_SECRET, // nên lưu trong biến môi trường .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // session tồn tại 1 ngày
    }
  }));
app.use(flash());
//END
//[Tinymce]
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end
//[moment] để fotmat hiển thị ngày tháng
app.locals.moment = moment;
//end
//[session]
//[router]
routerAdmin(app);
routerClient(app);
//END
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  