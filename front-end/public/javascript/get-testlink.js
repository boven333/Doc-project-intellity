$(document).ready(function () {
    const url = "http://localhost:3015/test-link";
    try {
        var table;

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json", // Specify the expected response format
            success: function (response) {
                console.log("col :", response.data);

                // Assuming response.data is an array containing column names
                const data = response.columns;

                // Initialize DataTable
                table = $("#con-form").DataTable({
                    // Define columns
                    columns: [
                        { title: "Select", defaultContent: '<div class="d-flex justify-content-center"><input type="checkbox" class="select-checkbox"/></div>' },
                        { title: "Columns keys" },
                    ],
                    columnDefs: [{ width: "10%", targets: 0 }],
                    initComplete: function() {
                        $("#con-form tbody td .sorting_1").on("click", () => {
                            alert("im in")
                        } )
                    }
                });

                // Populate DataTable with data
                data.forEach(function (key, item) {
                    table.row.add([
                        item.null, // Leave the first column empty for the checkbox
                        key,
                    ]).draw();
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching data:", textStatus, errorThrown);
            },
        });

        // Export button click event
        $("#exportButton").on("click", function () {
            var selectedRowsData = [];
            $(".select-checkbox:checked").each(function () {
                var rowData = table.row($(this).closest("tr")).data();
                selectedRowsData.push(rowData[1]); // Assuming the second column contains the actual data
            });
            console.log(selectedRowsData); // You can perform your export logic here
            // For example, you can iterate over selectedRowsData and export it in your desired format
        });

        // Select column checkbox click event
        $('#con-form').on('click',  function () {
            $(this).closest('tr').toggleClass('selected');
        });
    } catch (error) {
        console.error("Error:", error);
    }
});
