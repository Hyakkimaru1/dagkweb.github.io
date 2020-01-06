const mailer = require('nodemailer');

var transporter = mailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'systemauction2019@gmail.com',
        pass: '123456!@#$%^'
    }
});

//truyen vo email 
module.exports = {
    sendOTP: email =>{
        const data = {};
        data.otp = '';
        data.email = email;

        //generate random otp
        var i;
        var num;
        for (i = 0; i < 6; i++) {
            num = Math.floor(Math.random() * 10);
            data.otp += num.toString();
        }
        //gui otp

        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'Test',
            to: data.email,
            subject: 'Test Nodemailer',
            text: 'You recieved message from ' + 'systemauction2019@gmail.com',
            html: '<p>You have got a otp for verifying your account</b><ul><li>OTP code:' + data.otp + '</li></ul>'
        }
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });

        return data;
    },
    sendBid: (user, seller, namePro, price) => {

        let username = user.username.substr(user.username.length - 3);

        transporter.sendMail({
            from: 'System Auction 2019',
            to: user.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>You have placed "${namePro}" for ${price}</p>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });

        transporter.sendMail({
            from: 'System Auction 2019',
            to: seller.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>User "***${username}" have placed "${namePro}" for ${price}</p>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    },
    sendBuyNow: (user, seller, namePro, price) => {

        let username = user.username.substr(user.username.length - 3);

        transporter.sendMail({
            from: 'System Auction 2019',
            to: user.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>You have bought "${namePro}" for ${price}</p><br><h3>congratulations!</h3>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });

        transporter.sendMail({
            from: 'System Auction 2019',
            to: seller.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>User "***${username}" have bought "${namePro}" for ${price}</p><br><h3>congratulations!</h3>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    },
    sendMailDeny: (user, namePro) => {

        transporter.sendMail({
            from: 'System Auction 2019',
            to: user.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>You have been banned in product "${namePro}"</p>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    },
    sendMailEnd: (user, namePro) => {

        transporter.sendMail({
            from: 'System Auction 2019',
            to: user.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>The product "${namePro}" that you have placed is ended</p>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    },
    sendMailSigle: (user, namePro) => {

        transporter.sendMail({
            from: 'System Auction 2019',
            to: user.email,
            subject: 'Placed bid',
            text: 'You recieved message from systemauction2019@gmail.com',
            html: `<p>The product "${namePro}" that you have placed is placed by the other</p>`

        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
};