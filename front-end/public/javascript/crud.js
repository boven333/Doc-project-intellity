$(document).ready(function () {
  // URL of the API endpoint
  const apiUrl = "http://localhost:3015/acf"; // Replace with your API URL
  // Perform the GET request
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json", // Specify the expected response format
    success: function (response) {
      // Process the response and initialize DataTable
      const columns = getkeyForColumn(response.data);
      populateDataTable(columns, [...response.data]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching acf:", textStatus, errorThrown);
    },
  });

  //Function to get keys
  function getkeyForColumn(jsonArray){
    let uniqKeys = [];
    jsonArray.forEach(jsonItem => {
        const keys = Object.keys(jsonItem);
        uniqKeys.push(...keys);
    });
    uniqKeys = [...new Set(uniqKeys)];
    uniqKeys.splice(10,uniqKeys.length-10);
    
    return uniqKeys.reduce((acc,curr)=>{
        acc.push({data: curr,title: String(curr).toUpperCase()});
        return acc;
    },[]);
  } 

  // Function to populate DataTable

  function populateDataTable(kai, kuy) { // kai(position1) = columns, kuy(position2) = data 
    let table = $("#myTable").DataTable({
      data: kuy,
      columns: kai,
    });
  }
});
