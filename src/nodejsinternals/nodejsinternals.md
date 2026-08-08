// v8 engine -> execute js
// fs, timers
// more than v8 engine

## main js thread
normal app JS executes on one main JS thread

## V8 engine
1. Parsing JS
2. Execute JS
3. Manage call stack
4. Heap memory and performing garbage collection

## Node JS core APIS
- fs
- http
- path
- streams
- buffer
- process
- timers

core apis -> some of this written in js


## C++ Bindings
connect JS facing apis native functionality js code to communicate 
libuv
os apis
native liabraries


## libuv
native liabrary used by node js
event loop
worker thread pool
timers
async i/o handling

## OS
low level work
reading files
writing files
tracking time
