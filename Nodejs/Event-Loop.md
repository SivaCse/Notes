## Task Types

1) CPU-bound
2) I/O-bound

CPU-bound tasks examples:

Encryption
Password
Encoding
Compression
Calculations

### Input/Output examples:

Disk: write, read
Networking: request, response
Database: write, read

### Dealing with Slow I/O

Synchronous
Forking (later module)
Threading (more servers, computers, VMs, containers)
Event loop (this module)

### setTimeout vs. setImmediate vs. process.nextTick

setTimeout(fn, 0) - pushes to the next event loop cycle
setImmediate() similar to setTimeout() with 0 but timing is different sometimes, it is recommended when you need to execute on the next cycle
process.nextTick - not the next cycle (same cycle!), used to make functions fully async or to postpone code for events