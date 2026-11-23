
// js is single threaded and executes lines sequentially. Doesnt go to next line until it cooks the previous one.

// When we add ``c before a function, that function's
// execution is basically derailed from the normal js execution flow in js engine. So when 
// execution finishes, it's then got added to the normal js call stack.

// fetch() api uses 'Promise' which is a high 'priority queue' , 
// unlike normal 'task queue' that accomodates executed async functions.


// web api : settimeout(), setInterval(), fetch(), DOM api. these are found in browser environment, not in node env.

// Browsers are essentially sandboxes/VMs that execute remotely
//  received code on the local browser and run on the
//  local machine w/o affecting local machine at all, unlike node env.
//  Node can access lcoal machine, unlike browser console.

const handler = function () {
  console.log("inside the handler");
}

const headerChanger = function () {
  document.getElementById('headerone').innerHTML = 'Asynchronous tutorial';
}

const changeme = setTimeout(headerChanger, 3000);

document.querySelector('#stop').addEventListener('click', function () {
  clearTimeout(changeme);
  console.log("Button is pressed"); 
})


// stopwatch ::

const startClock = function () {
  console.log('Clock', Date.now())
};

let refToStart = null;

const doc = document.querySelector("#begin").addEventListener('click', function () {
  if (!refToStart) {
    refToStart = setInterval(startClock, 1000);
  }
});

document.querySelector("#end").addEventListener('click', function () {
  clearInterval(refToStart);
  refToStart = null;
  console.log("clock stopped");
});


// key event ::

const refToKey = document.getElementById('insert');

window.addEventListener('keydown', (e) => {
  refToKey.innerHTML = `
   <div class='keychange'>
      <table>
        <tr>
          <th>Key<th/>
          <th>Keycode<th/>
          <th>Code<th/>
        <tr/>
        <tr>
          <td>${e.key === ' ' ? 'space' : e.key }<td/>
          <td>${e.keyCode}<td/>
          <td>${e.code}<td/> 
        <tr/>
      <table/>
   <div/>
  `
})






