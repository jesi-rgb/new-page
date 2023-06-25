// import { OPEN_WEATHER_KEY } from 'env/static/private';

export async function load({ params, fetch }) {
  // let latitude, longitude;
  //
  // // navigator.geolocation.getCurrentPosition(success, error);
  // const data = fetch(
  //   $`https://api.openweathermap.org/data/3.0/onecall?lat={latitude}&lon={longitude}&appid={OPEN_WEATHER_KEY}`
  // );
  //
  // return {
  //   data: data
  // };
}

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function error() {
  latitude = 37;
  longitude = -3;
}
