'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};
const renderCountry = function (data, className = '') {
  const html = `
<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

////////// Khatarnaak New Method!!!! /////////////

const getCountry = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      // console.log(response);
      if (!response.ok) renderError('country not found');
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => {
      // console.log(response);
      if (!response.ok) renderError('country not found');
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 😢😢😢😢`);
      renderError('Something Wnt Wrong');
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountry('hiuhguyggguyg');
});

////challenge!!!!!!!!!!!!!!!!!!!!

const latlong = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(response => {
      // console.log(response);
      if (!response.ok) throw new Error('xxs');
      return response.json();
    })
    .then(data => getCountry(data.country))
    .catch(err => console.error(`${err} found Try again!!!!`))
    .finally('XXD');
};
latlong(52.508, 13.381);

///////////coding challenge 2;
// const imgContainer = document.querySelector('.images');
// const displayPic = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     console.log('Waiting for 2 seconds');
//     var img = document.createElement('img');
//     img.src = 'img/img-1.jpg';
//     //document.getElementById('body').appendChild(img);
//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('fhfhfh'));
//     });
//   }, 2000);
// });
//wait function

// const k = await wait();

// const wait = new (async function (seconds) {
//   return new Promise(function(resolve){
//     setTimeout((resolve,seconds*1000));
//   });

//promise ,.... self -(asysnc )....api ...=>no bother......await

//////////////optional Mthod call
// const getcountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);
//     renderCountry(data);
//     //2
//     const [neighbour] = data.borders;
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data = JSON.parse(this.responseText);
//       renderCountry(data, 'neighbour');
//     });
//   });
// };

// getcountry('usa');

// const xd = fetch('https://restcountries.eu/rest/v2/name/pakistan');
// console.log(xd);
