
$(document).ready(function() {
  console.log('on the way!');

  $.ajax({
    method: 'GET',
    url: '/api/user/weather',
    success: handleSuccess,
    error: handleError
  });

  // successfully retrieved the current weather from Weather Underground
  function handleSuccess(json) {
    let stringyData = JSON.parse(json);
    // console.log(stringyData);
    // console.log('current conditions: ' + stringyData.current_observation.temperature_string + '; feels like ' + stringyData.current_observation.feelslike_string);
    // console.log('precip_today_in: ' + stringyData.current_observation.precip_today_in);
    // console.log('windchill_f: ' + stringyData.current_observation.windchill_f);
    // console.log('heat_index_f: ' + stringyData.current_observation.heat_index_f);
    // console.log('wind_mph: ' + stringyData.current_observation.wind_mph);

    let spinnerForecast = 'It\'s a good day to spin!';

    // Use the current conditions to give a stashy twist to the weather:
    if (stringyData.current_observation.precip_today_in > 0.5) {
      spinnerForecast = 'You probably don\'t want to put fleece outside to dry today.';
    } else if (stringyData.current_observation.windchill_f != 'NA') {
      spinnerForecast = 'It\'s cold! You should definitely stay inside and work with your stash.';
    } else if (stringyData.current_observation.heat_index_f != 'NA') {
      spinnerForecast = 'It\'s pretty hot...maybe find some A/C, a cold drink, and some spinning. The stash can wait.';
    } else if (stringyData.current_observation.wind_mph > 10 && stringyData.current_observation.wind_mph < 25) {
      spinnerForecast = 'Kind of breezy today...might be a good day to dry fleece outside?';
    } 

    $('#weather').text(spinnerForecast);

    // now append the Weather Underground logo
    $('#weather').append('<footer><img src=\'/images/wundergroundLogo_4c_horz.png\' alt=\'weather underground\'></footer>');
  }

  function handleError() {
    //console.log('weather err:', err); 
    $('#weather').text('Couldn\'t get today\'s weather, but it\'s always a good day to work with your stash, right?');
    
    // now append the Weather Underground logo
    $('#weather').append('<footer><img src=\'/images/wundergroundLogo_4c_horz.png\' alt=\'weather underground\'></footer>');
  }

});
