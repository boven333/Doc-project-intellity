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
});
