# Nodejs Process Communication

Node JS applications uses “Single Threaded Event Loop Model” architecture 

NodeJS is single threaded, but this is a half truth, actually it is event-driven and single-threaded with background workers.

The main event loop is single-threaded but most of the I/O works run on separate threads, because the I/O APIs in Node.js are asynchronous/non-blocking by design, in order to accommodate the event loop.

Node.js is a single threaded language.

Node.js is non-blocking which means that all functions ( callbacks ) are delegated to the event loop and they are ( or can be ) executed by different threads. That is handled by Node.js run-time.

Node.js does support forking multiple processes , But We can pass messages to forked process ( which is different script ) and to master process from forked process with function send.

## Process forking

* forking is need to free up memory
* forking is need to run parallel tasks


## Example Fork

```js

const { fork } = require('child_process');
app.get('/endpoint', (request, response) => {
   // fork another process
   const process = fork('./send_mail.js');
   const mails = request.body.emails;
   // send list of e-mails to forked process
   process.send({ mails });
   // listen for messages from forked process
   process.on('message', (message) => {
     log.info(`Number of mails sent ${message.counter}`);
   });
   return response.json({ status: true, sent: true });
});



// send_mail.js

async function sendMultipleMails(mails) {
   let sendMails = 0;
   // logic for
   // sending multiple mails
   return sendMails;
}
// receive message from master process
process.on('message', async (message) => {
  const numberOfMailsSend = await sendMultipleMails(message.mails); 
  
  // send response to master process
  process.send({ counter: numberOfMailsSend });
});

```