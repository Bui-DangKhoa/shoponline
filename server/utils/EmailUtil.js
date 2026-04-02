//CLI: npm install nodemailer --save
const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS
  }
});
const EmailUtil = {
  send(email, id, token) {
    const text = 'Thanks for signing up, please input these informations to activate your account:\n\t .id: ' + id + '\n\t .token: ' + token;
    return new Promise(function (resolve, reject) {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Signup | Verification',
        text: text
      };
      transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.error('\n--- EMAIL LỖI: Bỏ qua gửi email ---');
          console.error(err.message);
          console.log('\n--- THÔNG TIN KÍCH HOẠT (ACTIVE) ---');
          console.log('Bạn vừa đăng ký Customer mới nhưng gửi email thất bại.');
          console.log('Hãy nhập thông tin sau vào trang Active:');
          console.log(' .id:    ' + id);
          console.log(' .token: ' + token);
          console.log('--------------------------------------\n');
          resolve(true); // Trả về true để bỏ qua lỗi email và cho phép Signup tiếp tục
        } else {
          resolve(true);
        }
      });
    });
  }
};
module.exports = EmailUtil;