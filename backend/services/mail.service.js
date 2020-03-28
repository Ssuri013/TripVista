"use strict";
const nodemailer = require("nodemailer");
const DbMixin = require("../mixins/db.mixin");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = {
    name: "mail",
    mixins: [
		DbMixin(userModel)
	],
    settings:{
    },
    
    actions: {
        send: {
            rest: "POST /mailer",
            
            async handler(ctx) {
                let to_email = ctx.params.email;
                let password = bcrypt.hashSync(ctx.params.password, 10);
                
                let user = ctx.params.username;
                let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    secure: false, 
                    auth: {
                     user: "tripvista001",
                     pass: "tripvista@123"
                    }
                  });
                  
                  var usertoken = this.getRandomInt(2015,5010);
                  let info = await transporter.sendMail({
                    from: '"Trip Vista" <tripvista001@gmail.com>', 
                    to: to_email, 
                    subject: "Trip Vista Account Verification", 
                    html: `<b>Hello ${user},</b><h1>Your verification code : ${usertoken}</h1> 
                    Please enter the code on Trip Vista to get verified. Thanks!`, 
                  });
                  console.log("Message sent: %s", info.messageId);

                  let dbcall = await ctx.call("user.updateToken",{
                      email:to_email,
                      token:usertoken,
                      name:user,
                      password:password,

                  });
                  var response = {email: to_email};

            return response;
            }            
        }
    },

    methods: {

         getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
     }
};