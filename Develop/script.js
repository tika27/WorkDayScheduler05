
// GIVEN make a  daily planner to create a schedule, WHEN I open the planner
// the current day is displayed at the top of the calendar
// WHEN I scroll down, 
// I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day,
// THEN each time block is color-coded to indicate whether it is in the past, present, or future.
// WHEN I click into a time block, THEN I can enter an event and 
// WHEN I click the save button for that time block.
// THEN the text for that event is saved in local storage
// WHEN I refresh the page, THEN the saved events persist.

$(function () {});
  
//Declare Variables
var today = moment().format("dddd, MMMM Do");

var now = moment().format("H A");

// planer time, daily planner to create a schedule
var planWorkday = [
  { time: "8 AM", event: "" },
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 PM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

//Local Storage
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkday = workEvents;
}

// current day
$("#currentDay").text(today);

//rows 
planWorkday.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	
	$(".container").append(row);
});

//current time 
function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

//Save events
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkday[blockID].event = userEntry;

	//Set local storage
	localStorage.setItem("workDay", JSON.stringify(planWorkday));
});
  