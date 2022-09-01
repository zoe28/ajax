'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then((response) => response.text())
    .then((fortuneResult) => {
      document.querySelector('#fortune-text').innerHTML = fortuneResult;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipcode}`;

  fetch(url)
    .then((response) => response.json())
    .then((weatherData) => {
      document.querySelector('#weather-info').innerHTML = weatherData.forecast;
    
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);



// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const formInput = {
    melon_type : document.querySelector('#melon-type-field').value,
    qty : document.querySelector('#qty-field').value
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInput),
    headers: {
      'Content-Type': 'application/json',
    },
  }) 
    .then((response) => response.json())
    .then((orderResult) => {
      console.log(orderResult)
      document.querySelector('#order-status').innerHTML = orderResult['msg'];
      // if orderResult['code'] is ERROR --> add class (order-error) to the div (#order-result)
      if (orderResult['code'] === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error');
      } else {
        document.querySelector('#order-status').classList.remove('order-error');
      }
    })

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


// Further Study

function getDogImg(evt) {
  evt.preventDefault();

  fetch('https://dog.ceo/api/breeds/image/random') 
      .then((response) => response.json())
      .then((dogResult) => {
        const imgURL = dogResult['message'];
        const dogImgDiv = document.querySelector('#dog-image');
        dogImgDiv.insertAdjacentHTML("beforeend", `<img src=${imgURL}>`);
      })
}

document.querySelector('#get-dog-image').addEventListener('click', getDogImg);
