const nodemailer = require('nodemailer');
const nodeCron = require('node-cron');
const Email = require('../models/email_model');

// using nodemailer package to directly send mails through node 
const transporter = nodemailer.createTransport({
  service: 'gmail',
//   service I am using here to send mail is gmail     
  auth: {
    // created a new mail id for testing purpose
    user: 'sumit12074343@gmail.com',
    pass: 'Jbj1234@'
  }
});

const scheduleEmail = (email) => {
  const sendEmail = () => {
    const mailOptions = {
      from: 'sumit12074343@gmail.com',
      to: email.recipient,
      subject: email.subject,
      text: email.body,
      attachments: email.attachments.map(filePath => ({ path: filePath }))
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // check if mail is sent or not if any error is there show error 
        console.log(`Error sending email: ${error}`);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  };

  const { scheduleTime, recurrence, recurringTime, recurringDays, recurringDates } = email;

  if (recurrence) {
    // creating conditions for different recurrances 
    switch (recurrence) {
      case 'daily':
        // for daily we need only hour and time 
        recurringTime.forEach(time => {
          const [hour, minute] = time.split(':');
          nodeCron.schedule(`${minute} ${hour} * * *`, sendEmail);
        });
        break;
      case 'weekly':
    //   for weekly case we need time and day s=as well  
        recurringDays.forEach(day => {
          recurringTime.forEach(time => {
            const [hour, minute] = time.split(':');
            nodeCron.schedule(`${minute} ${hour} * * ${day}`, sendEmail);
          });
        });
        break;
      case 'monthly':
        //   for weekly case we need time and date 
        recurringDates.forEach(date => {
          recurringTime.forEach(time => {
            const [hour, minute] = time.split(':');
            nodeCron.schedule(`${minute} ${hour} ${date} * *`, sendEmail);
          });
        });
        break;
      case 'quarterly':
        // quarterly means every 3 months so I have multiplied by 3 
        recurringDates.forEach(date => {
          recurringTime.forEach(time => {
            const [hour, minute] = time.split(':');
            nodeCron.schedule(`${minute} ${hour} ${date} */3 *`, sendEmail);
          });
        });
        break;
    }
  } else {
    nodeCron.schedule(new Date(scheduleTime), sendEmail);
  }
};

const cancelscheduledmail = (emailId) => {
    // To cancel mail I have directly deleted the mail
    if (jobs[emailId]) {
        jobs[emailId].stop();
        delete jobs[emailId];
      }
};

module.exports = { scheduleEmail, cancelscheduledmail };
