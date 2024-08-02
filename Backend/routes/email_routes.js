const express = require('express')
const Email = require("../models/email_model")
const {schedulemail,cancelscheduledmail} = require("../utils/email_schedular")

const router = express.Router();

// as we have to save the data into database so we are using post request over here

router.post('/schedule-email',async(req,res)=>{
    // Endpoint to schedule an email.
    const { recipient,subject,body,attachments,scheduledtime,recurrance,recurringTime,recurringDays,recurringDates} = req.body

    const email = new Email({
        recipient,subject,body,attachments,scheduledtime,recurrance,recurringTime,recurringDays,recurringDates
    })

    // trying to save the email in database 
    try {
        // waiting here to save mail so await is used in database
        await email.save();
    
        // Scheduling the email from here
        scheduleEmail(email);
    
        res.send(email);
      } 
    //   trying to catch error if email is not getting stored to database 
      catch (error) {
        res.send({ error: error.message });
      }
})

// now we are creating route to see the all scheduled mail so we are using get request
router.get('/getscheduled_mail',async(req,res)=>{
    // Endpoint to retrieve a list of scheduled emails.
        try{
            const emails = await Email.find();
            res.send(emails)
        }
        catch(err){
            console.log("Error Ocurred")
            res.send(err)
        }
})

// creating a route to get the specific mail using id 
router.get('/scheduled-emails/{id}',async(req,res)=>{
    // Endpoint to retrieve details of a specific scheduled email.
    // trying to find mail using id if found then send else give message not found 
    try{
        const email = await Email.findById(req.params.id);
        if(!email)
        {
            res.send("Email Not Found")
        }
        res.send(email)
    }
    // if there is some error in findind form it will be catched here 
    catch(err){
        console.log("Error Ocurred")
        res.send(err)
    }
})



router.delete('/scheduled-emails/:id', async (req, res) => {
    // Endpoint to cancel a scheduled email.
    const email = await Email.findByIdAndDelete(req.params.id);
    if (email) {
        cancelscheduledmail(email._id);
      res.send(email);
    } else {
      res.status(404).send({ error: 'Email not found' });
    }
  });
  
  module.exports = router;