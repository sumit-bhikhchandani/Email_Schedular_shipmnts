# Automated Email Scheduling API
I have created a backend using which users can send mails and see mail and also delete mails

## Features
- **Email Scheduling:** Schedule emails to be sent at a specific date and time.
- **Recurring Emails:** Set emails to recur on a daily, weekly, monthly, or quarterly basis.
  - **Daily:** Select specific times (e.g., 2 PM and 4 PM).
  - **Weekly:** Select specific days and times (e.g., Monday at 10 AM).
  - **Monthly:** Select specific days and times (e.g., 28th of the month at 8 AM).
  - **Quarterly:** Select specific days and times (e.g., 14th of the quarter at 9 AM).
- **Email Details:**
  - Recipient email address
  - Subject of the email
  - Body of the email
  - Schedule time for the email
  - Attachments

## API Endpoints
/schedule-email
/getscheduled_mail
/scheduled-emails/{id}
/scheduled-emails/:id

### POST /schedule-email: Endpoint to schedule an email.
### GET /scheduled-emails: Endpoint to retrieve a list of scheduled emails.
### GET /scheduled-emails/{id}: Endpoint to retrieve details of a specific scheduled email.
### DELETE /scheduled-emails/{id}: Endpoint to cancel a scheduled email.
