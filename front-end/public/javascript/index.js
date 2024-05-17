$(document).ready(() => {
    const $container = $(".container");
    const $search = $(".search-box button");
    const $weatherBox = $(".weather-box");
    const $weatherDetails = $(".weather-details");
    const $error404 = $(".not-found");
  
    $search.on("click", function (event) {
      const cityVal = $("#input-city").val();
      // alert( "Handler for `submit` called." + cityVal );
      $.ajax({
        dataType: "json",
        url: `http://localhost:3015/weather/${cityVal}`,
        // data: data,
        success: (json) => {
          if (json.cod === "404") {
            $container.css("height", "400px");
            $weatherBox.hide();
            $weatherDetails.hide();
            $error404.show();
            $error404.addClass("fadeIn");
            return;
          }
  
          $error404.hide();
          $error404.removeClass("fadeIn");
  
          const $image = $(".weather-box img");
          const $temperature = $(".weather-box .temperature");
          const $description = $(".weather-box .description");
          const $humidity = $(".weather-details .humidity span");
          const $wind = $(".weather-details .wind span");
  
          console.log(json);
  
          // when data responsed
          switch (json.weather[0].main) {
            case "Clear":
              $image.attr("src", "../images/clear.png");
              break;
            case "Rain":
              $image.attr("src", "../images/rain.png");
              break;
            case "Snow":
              $image.attr("src", "../images/snow.png");
              break;
            case "Clouds":
              $image.attr("src", "../images/cloud.png");
              break;
            case "Haze":
              $image.attr("src", "../images/mist.png");
              break;
            default:
              $image.attr("src", "");
          }
  
           // Setting the HTML content
          $temperature.html(`${parseInt(json.main.temp)}<span>°C</span>`);
          $description.html(`${json.weather[0].description}`);
          $humidity.html(`${json.main.humidity}%`);
          $wind.html(`${parseInt(json.wind.speed)}Km/h`);
  
          // Applying styles and adding classes
          $weatherBox.css('display', '');
          $weatherDetails.css('display', '');
          $weatherBox.addClass('fadeIn');
          $weatherDetails.addClass('fadeIn');
          $container.css('height', '590px');
  
        },
        error: () => {},
        complete: (c_response) => {
          console.log(c_response);
        },
      });
      event.preventDefault();
    });
  });
  