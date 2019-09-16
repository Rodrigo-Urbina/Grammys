$.ajax({
    url: "https://rodrigo-urbina.github.io/Grammys/data/grammys.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
        var idToSearch = 0;
        let new_html = "";
        for (let i = 0; i < data.fields.length; i++) {
            new_html += `
			<option value="${data.fields[i].field_id}">
			${data.fields[i].field}
			</option>
			`;
        }  

        $("#category_types").append(new_html);
        $("#category_types").on('change', function (event) {
            $("#category_title").text($(this).children("option:selected").text());
            let categoryData = $("#category_types").val();
            $("#category_list").empty();
            if (data.fields[categoryData - 1].hasOwnProperty("description")) {
                $("#description").text(data.fields[categoryData - 1].description);
            } else {
                $("#description").text("");
            }
            description(data.fields[categoryData - 1].categories);

        });



    },
    error: function (error_msg) {
        console.log(error_msg);
    }
});

function description(categories) {
    let new_html = "";
    for (let n = 0; n < categories.length; n++) {
        new_html += `
		<h4 value="${categories[n].category_id}">
		${categories[n].category_name}
		</h4>
		`;
        let peopleNominated = categories[n].nominees;
        for (let m = 0; m < peopleNominated.length; m++) {
            if (m == categories[n].winner_id) {
                new_html += `<li><h4  class="winner">${peopleNominated[m].nominee}</h4> <span> WINNER! </span></li>`
            } else {
                new_html += `<li><h4>${peopleNominated[m].nominee}</h4></li>`
            }
            new_html += `<p> ${peopleNominated[m].artist} </p>`
            new_html += `<p> ${peopleNominated[m].info} </p>`
        }
    }
    $("#category_list").append(new_html);

}