

// fetch() was part of a bluebird library . then it was added to js.


// Promise analogy :: A Promise is a JavaScript object, but it represents a
// value you’ll get later. Think of a Promise as an order
// receipt and the array as the food: having the receipt doesn’t mean
// you have the food yet. await waits for the Promise and gives you its successful value.


// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API   :::  important documentation. A must-read. !!!!
// Give a read on fetch() specifications.**



// fetch() returns a "promise". **


// fetch() dosen't have 'resolve/reject' concept like 'Promise()'. If browser
// cannot send the fetch() req, only then errors are visible.******


// fetch() sends its async to "high priority queue" unlike other
// async functions that are sent to "task queue".****


// Promise().then().catch().finally()

// fetch('METHOD',{HEADER}).then().catch()  **
// fetch() and its functions were part of bluebird library before integration.




const promise = new Promise(function (resolve, reject) {
  // do async tasks.
  // Db calls, cryptographic works, network calls.

  setTimeout(function () {
    console.log('async task is completed')
    resolve();
  }, 1000);
});

// .then() maps directly to "resolve"
// .catch() maps directly to "reject"

promise.then(function () {
  console.log('Promised is consumed')
})






new Promise(function (resolve,reject) {
  setTimeout(function () {
    console.log("ASync two");
    resolve();
  },1000)
}).then(function () {
  console.log("Async two consumed");
})

// resolve connects async operation in promise() to .then()  segment.






const promisenew = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ username: "sakibnisatalok", userEmail: "sakibnisatalok@google.com" });
  }, 1000);
})

promisenew.then(function (user) {
  console.log(user)
})

// promisenew.then(resultone,resulttwo,...)







const promisefour = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let error = false;
    if (!error) {
      resolve({ name: "baroodkhan" , password: "1234" });
    }
    else {
      reject("error : sth went unexpected.")
    }
  },1000)
})

// const userName = promisefour.then((user) => {
//   console.log(user);
//   return user.name;
// })
// we can't store promise.then()'s return value to a const
// for further use. we user '.then()' again to capture
// the return value. ***


promisefour
.then((user) => {
  console.log(user);
  return user.name;
})
.then((usernname) => {
  console.log(usernname)
})
.catch((error) => {
  console.log(error)
}) // added catch() as we also were dealing with "reject()" .**
.finally(() => {
  console.log("Promised is either rejected or resolved.")
}) // whatever happens 'finally()' will be executed.









const promisefive = new Promise(function (resolve,reject) {
  setTimeout(() => {
    let error = false;
    if (!error) {
      resolve({ langname: "javascript", password: "wwweee" });
    }
    else {
      reject('Error : sth went wrong')
    }
  }, 1000)
});

// async/await doesnt handle error feature-wise.we have to
// manually handle error using "try/catch".


async function consumePromise() {
  try {
    const res = await promisefive;
    console.log(res);
  }
  catch (error) {
    console.log(error)

  }
}
// async keyword basically enables await
// keyword inside the function.


// async allows us to use await inside a function. It also means calling
// the function always returns a Promise.****

consumePromise(); // assync function essentially means
// we have some async response inside the function.






async function fetchAllUsers() {

  const url = 'https://jsonplaceholder.typicode.com/users'
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  } // important for handling https errors. **

  //console.log(res) if i write console here, "response object(status: 200, ok: true, headers, and body: ReadableStream)" gets
  //printed. but not after "res.json()" because of
  //time issue. we have to use await here.


  // fetch() resolves once headers arrive; the body is "still streaming".
  // res.json() reads + parses the body asynchronously and returns a Promise,
  // so we must await it to get the actual data. ***


  const data = await res.json(); // This has to read the entire body stream until it finishes, then parse the text as JSON. Since this is also async, it returns a Promise instead of the actual data.
  /*

  const data = await res.json(); // res.json() returns a Promise (body streams + parses async);
                                 // await unwraps it, so data = parsed JS array of user objects. ******


  */


  
  console.log(data);

  return data;




  
  /* 

  const data = res.json();        // ❌ data = Promise { <pending> }, the body isn't fully read yet
  const data = await res.json();  // ✅ waits for the body to download and parse, so data = the users array. ****
  
  */
}

// res   : Response object: status, headers, methods for reading the body.
// data  : The actual users array.


fetchAllUsers();


/*

all about fetch() :::

fetch() builds the new Promise(executor) for you, and async/await is shorter syntax for .then() and .catch().


1. fetch() calls resolve() and reject() for us :-

A simplified model of what fetch() does internally:

function fetch(url) {
  return new Promise((resolve, reject) => {
  
    - The browser/Node runtime sends the network request...
     when headers arrive:       resolve(responseObject);
    - if a network failure happens: reject(new TypeError("Failed to fetch"));
  });
}

a. resolve(res) runs whenever the server replies, even with a 404 or 500. That’s why you need the if (!res.ok) check.

b. reject() runs only on network-level failures, such as being offline, a DNS error, or a CORS block.

c. res.json() works the same way: it returns a promise that resolves once the body has been read and parsed.



2. What await does :-

await promise:

a. Pauses the async function (without blocking the rest of the program).

b. Waits until the promise settles.

c. If it was resolved → await gives back the value, the same value .then() would receive.

d. If it was rejected → await throws the reason, so you catch it with try/catch (the equivalent of .catch()).

e. The rest of the function then continues as a microtask.



3. An async function is itself a promise :-

a. Calling it always returns a Promise.

b. return value → works like resolve(value)

c. throw error → works like reject(error)





*/






async function showFirstUser() {
  try {
    const users = await fetchAllUsers(); // users here is not a "Promise" like data in fetchAllUsers(), where it's an array of objects. 'await' waits for that 'Promise' to settle, then unwraps it and gives back the resolved value to (here, users.). Here the returned value of fetchAllUsers() is a Promise. *****
    console.log(users[0].name);
  } catch (error) {
    console.log('Could not load users:', error);
  }
}

showFirstUser();



// doing the same task using fetch() and .then()
fetch('https://jsonplaceholder.typicode.com/users')
.then((response) => {
    return response.json();
})
.then((data) => {
  console.log(data);
  console.log(data[0].name);
  console.log(data[0].email);
})
  .catch((error) => {
    console.log(error);
})



// if we focus we can see that all fetch() contents are getting executed
// before other async operations.**** bcoz of high priority queue.**



/*
                                                                                         Global Memory :
                                                                                           -expecting a response... (c)

                            res = fetch('sth')
                              /       \
                             /         \
               data : (a) or (b)
               (a)onFulfilled[]            web browser/node
               (b)onRejection[]                  |
                                                 |
                                              network req()
                                               /   \
                                              /     \
                                    (successful)    (failed.Couldn't send the req)


# successful goes to 'onFulfilled[]'. If server sends errors, they will also go into 'onFulfilled[]'. ****
# failed req goes to 'onRejection[]'. This is actually network level failure. **
# Now data gets populated by these arrays' elements.(elements are functions here). **
# then data links (c) in the global memory context. ****  (data)-->(c)




*/


// js engine or js technically doesnt have in-built
// asynchronous feature. It's the different runtimes that help js to achieve it.




/*

 all about 'new Promise()' :::


In JavaScript, a Promise is an object that holds the eventual outcome
of an operation: a value if it succeeds, or a reason if it fails.

The problem it solves is simple: a function can finish before its
result is ready. A network request might take a second, but JavaScript needs
to keep handling clicks and running other code meanwhile. The function returns
a promise immediately; your code describes what should happen when the result arrives.


Promises give asynchronous operations a standard way to connect together, including
passing results forward and handling failures. Promise constructor documentation
Underneath, think of a promise as a small state machine.

Conceptually, the engine stores:
- State: pending, fulfilled, or rejected.
- Result: the fulfillment value or rejection reason.
- Handlers: the callbacks registered through .then() and .catch().


1. new Promise(executor) creates a pending promise and calls the executor
immediately, giving it resolve and reject functions.

2. Calling .then(callback) registers a handler. If the promise is
pending, the engine keeps that handler until the outcome is ready.

3. resolve(fulfilled value ) fulfills the promise with value; reject(error) declines.
it. Once settled, its state and result cannot change.

4. The engine schedules the appropriate handlers as microtasks. They run after
the current synchronous code finishes. If you attach a handler after settlement, it is
still scheduled with the stored result.

5. If you never call resolve() or reject(), the executor doesn’t send any state at all. The promise just stays pending forever. .then() and .catch() do get registered, but they wait forever because nothing ever triggers them.****

example : -----

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("task done"); // still runs, the executor code itself executes
  }, 1000);
});

p.then(() => console.log("then"));   // never runs
p.catch(() => console.log("catch")); // never runs

-----

Exception: a synchronous throw inside the executor auto-rejects the promise, so .catch() does run:

new Promise(() => {
  throw new Error("oops"); // promise becomes rejected automatically
}).catch(err => console.log(err.message)); // works properly.

-----

This does not apply to a throw inside an async callback such as setTimeout. That error happens later, outside the executor, so it becomes an uncaught error and the promise stays pending:

new Promise(() => {
  setTimeout(() => { throw new Error("oops"); }, 1000); //uncaught, .catch() won't run.
}).catch(err => console.log(err));


Also, returning a value from the executor does nothing. Only resolve() passes a value to .then().
So inside async callbacks, the only way to settle a promise is to call resolve() or reject() yourself. ****

-----

 setTimeout() is an async function and could be put inside the executor.**

*/
















































