$(document).ready(function() {
    const container = $('.container');
    const search = $('.search-box button');
    const weatherBox = $('.weather-box');
    const weatherDetails = $('.weather-details');
    const error404 = $('.not-found');

    search.on('click', function() {
        const city = $('.search-box input').val();

        if (city === '')
            return;

        $.getJSON(``, function(json) {

            if (json.cod === '404') {
                container.css('height', '400px');
                weatherBox.hide();
                weatherDetails.hide();
                error404.show().addClass('fadeIn');
                return;
            }

            error404.hide().removeClass('fadeIn');

            const image = $('.weather-box img');
            const temperature = $('.weather-box .temperature');
            const description = $('.weather-box .description');
            const humidity = $('.weather-details .humidity span');
            const wind = $('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.attr('src', 'images/clear.png');
                    break;

                case 'Rain':
                    image.attr('src', 'images/rain.png');
                    break;

                case 'Snow':
                    image.attr('src', 'images/snow.png');
                    break;

                case 'Clouds':
                    image.attr('src', 'images/cloud.png');
                    break;

                case 'Haze':
                    image.attr('src', 'images/mist.png');
                    break;

                default:
                    image.attr('src', '');
            }

            temperature.html(`${parseInt(json.main.temp)}<span>°C</span>`);
            description.html(json.weather[0].description);
            humidity.html(`${json.main.humidity}%`);
            wind.html(`${parseInt(json.wind.speed)}Km/h`);

            weatherBox.show().addClass('fadeIn');
            weatherDetails.show().addClass('fadeIn');
            container.css('height', '590px');

        });

    });
});

