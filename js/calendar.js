document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const eventForm = document.getElementById("eventForm"); // Form to add or edit events
  const eventDate = document.getElementById("eventDate"); // Input field for the selected date
  const eventTitle = document.getElementById("eventTitle"); // Input field for the event title
  const eventList = document.getElementById("eventList"); // List to display all saved events

  let events = JSON.parse(localStorage.getItem("events")) || {}; // Retrieve saved events from localStorage or initialize an empty object if none exist
  let editingDate = null; // Track the date of the event being edited

  // Event listener for the form submission to add or update events
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way (page reload)
    const date = eventDate.value; // Get the selected date from the form
    const title = eventTitle.value; // Get the event title from the form

    // Check if both date and title are provided
    if (date && title) {
      if (editingDate) {
        events[editingDate] = title; // Update the existing event
      } else {
        events[date] = title; // Save the new event
      }
      localStorage.setItem("events", JSON.stringify(events)); // Store the updated events in localStorage
      renderEvents(); // Re-render the events list to reflect changes
      editingDate = null; // Reset the editing date
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
      deleteButton.addEventListener("click", () => deleteEvent(date));

      const editButton = document.createElement("button"); // Create an edit button for each event
      editButton.textContent = "Edit"; // Set the button text to "Edit"
      // Add a click event listener to handle event editing
      editButton.addEventListener("click", () => editEvent(date));

      const container = document.createElement("div");
      container.appendChild(editButton);
      container.appendChild(deleteButton);

      li.appendChild(container);
      eventList.appendChild(li); // Append the list item to the event list
    }
  }

  // Function to handle editing an event
  function editEvent(date) {
    const newTitle = prompt("Edit event title:", events[date]); // Prompt the user to enter a new event title
    if (newTitle !== null && newTitle.trim() !== "") {
      // Check if the user entered a non-empty value
      events[date] = newTitle; // Update the event with the new title
      localStorage.setItem("events", JSON.stringify(events)); // Update localStorage with the new event data
      renderEvents(); // Re-render the events list to reflect changes
    }
  }

  // Function to delete an event
  function deleteEvent(date) {
    delete events[date]; // Remove the event from the `events` object
    localStorage.setItem("events", JSON.stringify(events)); // Update localStorage to reflect the deleted event
    renderEvents(); // Re-render the events list to reflect the deletion
  }

  // Initial render of the events on page load
  renderEvents(); // Display any saved events from localStorage
});
