var now = moment();
var timeNow = moment().format("h:mm a");
var reminderNow = [];
var timeTodayArr = [];

function publishTime() {
  $("#theTime").html("Current Time: " + timeNow);
}

setInterval(publishTime, 10);

//----------------------------
window.onload = function() {
  console.log("previous.js loaded");
  // Make a get request to our api route that will return every book
  $.get("/api/previous", function(data) {
    // For each book that our server sends us back
    for (var i = 0; i < data.length; i++) {
      // Create a parent div to hold book data
      var reminderSection = $("<div>");
      // Add a class to this div: 'reminder'
      reminderSection.addClass("well");
      // Add an id to the reminder to mark which reminder it is
      reminderSection.attr("id", "reminder-show" + i);
      // Append the reminder to the reminder section
      $("#reminderSection").append(reminderSection);

      var time = moment(data[i].time, "HH:mm:ss").format("h:mm a");

      // Now  we add our book data to the reminder we just placed on the page
      $("#reminder-show" + i).append(
        "<h5>" + (i + 1) + ". " + data[i].title + "</h5>"
      );
      $("#reminder-show" + i).append("<h6>Date: " + data[i].date + "</h6>");
      $("#reminder-show" + i).append("<h6>Time: " + time + "</h6>");
      $("#reminder-show" + i).append(
        "<button class='update' data-id='" + data[i].id + "'>EDIT</button>"
      );
      $("#reminder-show" + i).append(
        "<button class='delete' data-id='" + data[i].id + "'>DELETE</button>"
      );
    }

    $(".delete").click(function() {
      $.ajax({
        method: "DELETE",
        url: "/api/reminder/" + $(this).attr("data-id")
      })
        // On success, run the following code
        .then(function() {
          console.log("Deleted Successfully!");
        });
      window.location.reload();
      // $(this).closest("#reminder-show" + i).remove();
    });

    $(".update").click(function() {
      $.ajax({
        method: "PUT",
        url: "/api/reminder/" + $(this).attr("data-id")
      })
        // On success, run the following code
        .then(function() {
          console.log("Updated Successfully!");
        });
      // $(this).closest("#reminder-show" + i).remove();
    });
  });
};
