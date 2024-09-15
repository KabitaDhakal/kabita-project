document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const calendar = document.getElementById("calendar"); // Calendar grid container
  const calendarMonthYear = document.getElementById("calendarMonthYear"); // Displays the current month and year
  const eventForm = document.getElementById("eventForm"); // Form to add or edit events
  const eventDate = document.getElementById("eventDate"); // Input field for the selected date
  const eventTitle = document.getElementById("eventTitle"); // Input field for the event title
  const eventList = document.getElementById("eventList"); // List to display all saved events
  const prevMonthBtn = document.getElementById("prevMonth"); // Button to navigate to the previous month
  const nextMonthBtn = document.getElementById("nextMonth"); // Button to navigate to the next month

  let currentDate = new Date(); // Track the current date for rendering the calendar
  let events = JSON.parse(localStorage.getItem("events")) || {}; // Retrieve saved events from localStorage or initialize an empty object if none exist

  // Function to render the calendar grid for the current month
  function renderCalendar() {
    calendar.innerHTML = ""; // Clear the existing calendar grid
    const year = currentDate.getFullYear(); // Get the current year
    const month = currentDate.getMonth(); // Get the current month (0-11)
    const firstDay = new Date(year, month, 1).getDay(); // Get the day of the week for the first day of the month
    const lastDate = new Date(year, month + 1, 0).getDate(); // Get the last date of the current month

    // Update the month and year display at the top of the calendar
    calendarMonthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    // Add blank spaces before the first day of the month (to align the calendar)
    for (let i = 0; i < firstDay; i++) {
      const blankDay = document.createElement("div"); // Create an empty div for blank days
      calendar.appendChild(blankDay); // Append the blank day to the calendar
    }

    // Add the actual days of the current month
    for (let i = 1; i <= lastDate; i++) {
      const day = document.createElement("div"); // Create a div for each day
      day.textContent = i; // Display the day number
      // Set the data-date attribute in 'YYYY-MM-DD' format for the day
      day.dataset.date = `${year}-${(month + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
      // Add click event listener to handle date selection
      day.addEventListener("click", () => selectDate(day));
      calendar.appendChild(day); // Append the day to the calendar
    }
  }

  // Function to handle selecting a date in the calendar
  function selectDate(day) {
    const selectedDate = day.dataset.date; // Get the selected date from the clicked day
    eventDate.value = selectedDate; // Set the selected date in the event form
    eventTitle.value = events[selectedDate] || ""; // If there's an event for the selected date, populate the title; otherwise, leave it blank

    // Clear any previously selected day by removing the 'selected' class
    document.querySelectorAll(".calendar div").forEach((d) => d.classList.remove("selected"));
    day.classList.add("selected"); // Add the 'selected' class to highlight the clicked day
  }

  // Event listener for the form submission to add or update events
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way (page reload)
    const date = eventDate.value; // Get the selected date from the form
    const title = eventTitle.value; // Get the event title from the form

    // Check if both date and title are provided
    if (date && title) {
      events[date] = title; // Save the event (using the date as the key)
      localStorage.setItem("events", JSON.stringify(events)); // Store the updated events in localStorage
      renderEvents(); // Re-render the events list to reflect changes
    }
  });

  // Function to render the list of saved events
  function renderEvents() {
    eventList.innerHTML = ""; // Clear the existing list of events
    // Loop through the saved events in the `events` object
    for (let date in events) {
      const li = document.createElement("li"); // Create a list item for each event
      li.textContent = `${date}: ${events[date]}`; // Display the date and event title

      const deleteButton = document.createElement("button"); // Create a delete button for each event
      deleteButton.textContent = "Delete"; // Set the button text to "Delete"
      // Add a click event listener to handle event deletion
      deleteButton.addEventListener("click", () => deleteEvent(date));

      li.appendChild(deleteButton); // Append the delete button to the list item
      eventList.appendChild(li); // Append the list item to the event list
    }
  }

  // Function to delete an event
  function deleteEvent(date) {
    delete events[date]; // Remove the event from the `events` object
    localStorage.setItem("events", JSON.stringify(events)); // Update localStorage to reflect the deleted event
    renderEvents(); // Re-render the events list to reflect the deletion
  }

  // Event listener for navigating to the previous month
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // Decrease the month by 1
    renderCalendar(); // Re-render the calendar for the updated month
  });

  // Event listener for navigating to the next month
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // Increase the month by 1
    renderCalendar(); // Re-render the calendar for the updated month
  });

  // Initial render of the calendar and events on page load
  renderCalendar(); // Display the current month's calendar
  renderEvents(); // Display any saved events from localStorage
});
