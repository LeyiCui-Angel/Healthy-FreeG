function sendAjax() {
    $.ajax({
        type: "POST",
        url: "upload_file",
        dataType : "text",
        contentType: "application/text; charset=utf-8",
        data : new_apt,
        success: function(result){
            $('#success-add-apt').empty();
            let resultID = parseInt(result)
            $('#success-add-apt').append(successCard(resultID));

            $('#close-modal').click(function (){
                $('#success-add-apt').empty()
            })

            $('#view-modal').click(function (){
                window.location.href='/view/' + resultID;
            })

            emptyInputs();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}

$( document ).ready(function() {
    $("#upload-file-form").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
        url: "upload_file",
        type: 'POST',
        data: formData,
        success: function (data) {
            $("#upload-file-form").hide();
            // $("#placeholder").append(data)
            json_data = JSON.parse(data)
            $.each(json_data["items"], function (i, datum) {
                $("#placeholder").append("<div class='row'>" + datum + "</div>")
            })
        },
        cache: false,
        contentType: false,
        processData: false
    });
});
});