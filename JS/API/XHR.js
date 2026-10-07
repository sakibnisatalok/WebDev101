
const url = 'https://api.github.com/users/sakibnisatalok'
const xhr = new XMLHttpRequest();

xhr.open('GET', url);

xhr.onreadystatechange = function () {
  console.log(xhr.readyState);
  if (xhr.readyState === 4) {
    const res = JSON.parse(this.responseText); // incoming response's datatype is string.
    //use json.parse() to make it an object.
    console.log(res.followers);
  }
}

xhr.send();























