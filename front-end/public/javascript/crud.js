$(document).ready(function() {
    // URL of the API endpoint
    const apiUrl = 'http://localhost:3015/crud/users'; // Replace with your API URL

    // Perform the GET request
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json', // Specify the expected response format
        success: function(response) {
            console.log('Users:', response);
           // Process the response and initialize DataTable
           populateDataTable(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching users:', textStatus, errorThrown);
        }
    });

    // Function to populate DataTable
    function populateDataTable(users) {
        let table = $('#myTable').DataTable({
            data: users, // Use the fetched users data
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'email' },
                { data: 'address.city' },
                { data: 'phone' },
                { data: 'company.name' }
            ]
        });
    }
});
