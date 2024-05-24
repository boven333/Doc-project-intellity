$(document).ready(function () {
  // URL of the API endpoint
  const $search = $("#search-pm25"); // button
  const $inputSearch = $("#input-pm25"); //input element

  function updateTable() {
    const pm25Val = $("#input-pm25").val();
    $.ajax({
      url: `http://localhost:3015/pm2_5/${pm25Val}`,
      method: "GET",
      dataType: "json", // Specify the expected response format
      success: function (response) {
        // Process the response and initialize DataTable
        populateDataTable(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching pm 2.5:", textStatus, errorThrown);
      },
    });
  };

  $inputSearch.on("click keypress", (event) => {
    if (event.which == 13) {
      updateTable();
    }
  });

  // Perform the GET request
  $search.on("click", function (event) {
    updateTable();
  });

  // Function to populate DataTable
  function populateDataTable(pm) {
    console.log(pm);
    // 1st round
    if (DataTable.isDataTable("#myTable")) {
      const table = $("#myTable").DataTable();
      table.clear().draw();
      table.rows.add([
        {
          city: pm.data.city.name,
          pm25: pm.data.iaqi.pm25.v,
          pm10: pm.data.iaqi.pm10.v,
          co: pm.data.iaqi.co.v
        },
      ]); // Add new data
      table.columns.adjust().draw(); // Redraw the DataTable
    } else {
      const table = $("#myTable").DataTable({
        data: [{
          city: pm.data.city.name,
          pm25: pm.data.iaqi.pm25.v,
          pm10: pm.data.iaqi.pm10.v,
          co: pm.data.iaqi.co.v
        }], // Use the fetched users data
        columns: [
          { data: "city", title: "City Name" },
          { data: "pm25", title: "PM2.5" },
          { data: "pm10", title: "PM1.0" },
          { data: "co", title: "CO" },
        ],
      });
    }
  }


  //search data card 
  $('#button-addon2').click(function () {
    const pm25Val = $("#input-pm25").val();

    // Make AJAX request to fetch data
    $.ajax({
      url: `http://localhost:3015/pm2_5/${pm25Val}`,
      method: 'GET',
      dataType: 'json',
      success: function (pm) {
        console.log("pmget", pm);

        try {
          const city = pm.data.city.name;
          const pm25 = pm.data.iaqi.pm25 ? pm.data.iaqi.pm25.v : undefined = "N/A";
          const pm10 = pm.data.iaqi.pm10 ? pm.data.iaqi.pm10.v : undefined = "N/A";
          const co = pm.data.iaqi.co ? pm.data.iaqi.co.v : undefined = "N/A";

          // Update the card with data
          $('.card-body p').eq(0).text('City Name : ' + city );
          $('.card-body p').eq(1).text('PM 2.5 : ' + pm25 + ' (ug/m3)');
          $('.card-body p').eq(2).text('PM 1.0 : ' + pm10 + ' (ug/m3)');
          $('.card-body p').eq(3).text('CO : ' + co + ' (ppm) ');
        
        } catch (error) {
          // console.error('Error processing data:', error);
          // Show SweetAlert2 error notification
          Swal.fire({
            icon: 'error',
            title: "เราไม่พบ " + pm25Val + " ในการบริการของเรา",
            text: 'อาจไม่มีสถานที่ที่คุณต้องการ',
          });
        }
      },

      error: function (xhr, status, error) {
        // Handle any errors
        // console.error('Error fetching data:', error);
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: '',
          text: '',
        });
      }
    });
  });
});


