


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
}// async keyword basically enables await
// keyword inside the function.


consumePromise(); // assync function essentially means
// we have some async response inside the function.










async function fetchAllUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users'
  const res = await fetch(url);
  //console.log(res) if i write console here, data gets
  //printed. but not after "res.json()" because of
  //time issue. we have to use await here.
  const data = await res.json() ;
  console.log(data)
}

//fetchAllUsers();


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



// if we focus we can see that all fetch() content are getting executed before other async operations.****



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


// js engine or js technically doesnt have in-built asynchronous feature. It's the different runtimes that help js to achieve it.




























































