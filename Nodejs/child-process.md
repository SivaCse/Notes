# Child Process 

Used to Run shell comments

Credit to : https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a

Node js is Single threaded. but some times single process is not enough to handle entire load of the application. so using child_process module we can spawn additional process.child_process module allows to create child processes in Node.js. Those processes can easily communicate with each other using a built-in messaging system

There are four different ways to create a child process in Node: spawn(), fork(), exec(), and execFile().

```js

const { spawn } = require('child_process');
const ls = spawn('ls');

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

/*

stdout: big.file
big-file-creation.js
child-process.js
child-process2.js
streams.js
streams2.js

child process exited with code 0


*/

```
## exec

this method runs a command in a console and buffers the output

```js

const exec = require('child_process').exec;  
exec('ls', (err, stdout, stderr) => {  
  if (err) {  
    console.error(err);  
    return;  
  }  
  console.log(stdout);  
});  

```

## spawn

The spawn function launches a command in a new process and we can use it to pass that command any arguments. it is generally used when the process returns large amount of data.

## fork()

The fork function is a variation of the spawn function for spawning node processes. The biggest difference between spawn and fork is that a communication channel is established to the child process when using fork, so we can use the send function on the forked process along with the global process object itself to exchange messages between the parent and forked processes. We do this through the EventEmitter module interface.

```js

// parent.js

const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.on('close', (msg) => {
  console.log('Exit Event emitted from child');
});


forked.send({ hello: 'world' });


// child.js

process.on('message', (msg) => {
  console.log('Message from parent:', msg);
});

let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });

  if(counter === 10) {
  	process.exit();
  }
}, 1000);

```

## Example 2 fork()

When craeting a long running task will block the main thread. so that we can split into another process using fork().

```js

// app.js

const http = require('http');
const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  };
  return sum;
};
const server = http.createServer();
server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const sum = longComputation();
    return res.end(`Sum is ${sum}`);
  } else {
    res.end('Ok')
  }
});

server.listen(3000);

```

Solution 

```js

// app.js

const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork('compute.js');
    compute.send('start');
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);



// compute.js

const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  };
  return sum;
};

process.on('message', (msg) => {
  const sum = longComputation();
  process.send(sum);
});



```

## Process Next Tick

Every time the event loop takes a full trip, we call it a tick.

When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts