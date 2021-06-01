require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const log = console.log;

module.exports = {


    sendEmail: (product,userMails) => {

        // Step 1
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account 
                pass: process.env.PASSWORD || '1234' // TODO: your gmail password
            }
        });

        // Step 2
        transporter.use('compile', hbs(
            {
                viewEngine: {
                    partialsDir: "./src/views",
                    defaultLayout: ""
                },
                viewPath: "./src/views",
                extName: ".handlebars"
            }
        ));
        //AXIOS busco todos los usuarios que tienen el producto en la wishlist
        //verifico si los usuarios estan suscritos a las newsletter los incluyo en el array
        //

        // Step 3
        let mailOptions = {
            from: 'martinzaratustra@gmail.com', // TODO: email sender
            to: userMails, // TODO: email receiver
            subject: 'EATX Newsletter',
            text: 'Wooohooo it works!!',
            template: 'index',
            context: {
                discount:product.discount,
                name: product.name,
                image:product.img,
                productId:"https://ec-webft11-g10.vercel.app/product/"+product.id.toString()
            } // send extra values to template
        };

        // Step 4
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log(err);
            }
            return log('Email sent!!!');
        });




    },


}