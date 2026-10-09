

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
// .catch() maps directly to "resolve"

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
  
  //console.log(res) if i write console here, data gets
  //printed. but not after "res.json()" because of
  //time issue. we have to use await here.
  // 
  const data = await res.json() ;
  console.log(data)
}

// res   : Response object: status, headers, methods for reading the body.
// data  : The actual users array.


//fetchAllUsers();



async function showFirstUser() {
  try {
    const users = await fetchAllUsers(); // users/data here is a "Promise" unlike data in fetchAllUsers(), where
   // its an array of objects.
    console.log(users[0].name);
  } catch (error) {
    console.log('Could not load users:', error);
  }
}

// showFirstUser();


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





// all about Promise :::

/*

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

3. resolve(fulfilled value ) fulfills the promise with value; reject(error) rejects
it. Once settled, its state and result cannot change.

4. The engine schedules the appropriate handlers as microtasks. They run after
the current synchronous code finishes. If you attach a handler after settlement, it is
still scheduled with the stored result.


*/























