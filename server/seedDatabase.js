const mongoose = require('mongoose');
const MyConstants = require('./utils/MyConstants');
const Models = require('./models/Models');

// Kết nối database
const uri = 'mongodb+srv://' + MyConstants.DB_USER + ':' + MyConstants.DB_PASS + '@' + MyConstants.DB_SERVER + '/' + MyConstants.DB_DATABASE;
mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to MongoDB. Đang tạo dữ liệu mẫu...');

    // 1. Xoá Admin cũ nếu có và thêm Admin mới
    await Models.Admin.deleteMany({});
    const newAdmin = new Models.Admin({
      _id: new mongoose.Types.ObjectId(),
      username: 'admin',
      password: '123'
    });
    await newAdmin.save();
    console.log('=> Đã tạo Admin: username="admin", password="123"');

    // 2. Xóa Category và tạo mới
    await Models.Category.deleteMany({});
    const cat1 = new Models.Category({ _id: new mongoose.Types.ObjectId(), name: 'Điện thoại' });
    const cat2 = new Models.Category({ _id: new mongoose.Types.ObjectId(), name: 'Laptop' });
    await cat1.save();
    await cat2.save();
    console.log('=> Đã tạo Categories: Điện thoại, Laptop');

    // 3. Xóa Product và tạo mới (7 sản phẩm, ảnh rõ ràng)
    await Models.Product.deleteMany({});
    const now = new Date().getTime();
    const products = [
      { name: 'iPhone 15', price: 20000000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', category: cat1 },
      { name: 'Samsung Galaxy S23', price: 18000000, image: 'https://images.unsplash.com/photo-1510557880182-3a9352c5d1c1?auto=format&fit=crop&w=600&q=80', category: cat1 },
      { name: 'Xiaomi 13', price: 12000000, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80', category: cat1 },
      { name: 'Oppo Find X6', price: 15000000, image: 'https://images.unsplash.com/photo-1523475496153-3d6cc7e7a4f5?auto=format&fit=crop&w=600&q=80', category: cat1 },
      { name: 'MacBook Air M2', price: 25000000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', category: cat2 },
      { name: 'Dell XPS 13', price: 30000000, image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80', category: cat2 },
      { name: 'Asus ZenBook 14', price: 22000000, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80', category: cat2 }
    ];
    for (const p of products) {
      const prod = new Models.Product({ _id: new mongoose.Types.ObjectId(), name: p.name, price: p.price, image: p.image, cdate: now, category: p.category });
      await prod.save();
    }
    console.log('=> Đã tạo 7 Products mẫu với ảnh rõ ràng');

    console.log('\n--- TẠO DỮ LIỆU THÀNH CÔNG ---');
    console.log('Bạn có thể đóng file cấu hình này lại (Ctrl + C) và đăng nhập Admin với tài khoản "admin", mật khẩu "123".');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Không thể kết nối MongoDB:', err);
  });
