# Project Documentation

## Overview

This project is a basic webpage designed as part of a college assignment. It demonstrates fundamental web development skills, incorporating HTML, CSS, and JavaScript to create a simple yet functional user interface. The webpage showcases structured content, interactive elements, and responsive design principles.

## File Structure

```bash
/js
  ├── calendar.js
  ├── music.js
  ├── script.js
  └── todo.js
/css
  ├── calendar.css
  ├── music.css
  ├── style.css
  ├── todo.css
  └── reset.css
index.html
/music
  └── ... (default music files for the music player)
```

## Features Overview

### 1. Calendar (`calendar.js`)

This module allows users to manage events on specific dates. The core functionalities include:

- **Event Management**:
  - **Adding Events**: The user submits an event title and date through a form, which updates the `events` object and saves it to `localStorage`.
  - **Editing Events**: Users can edit existing events by prompting for a new title and updating the corresponding entry in the `events` object.
  - **Deleting Events**: Events can be removed, updating both the display and `localStorage`.

##### Key Code Snippets:

```javascript
eventForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const date = eventDate.value;
  const title = eventTitle.value;
  events[editingDate ? editingDate : date] = title;
  localStorage.setItem("events", JSON.stringify(events));
  renderEvents();
});
```

This snippet captures the form submission, updates the events object, and calls `renderEvents()` to update the UI.

### 2. Music Player (`music.js`)

The music player module provides functionalities for playing and managing audio tracks:

- Track Management:
  - Playback Control: The user can play, pause, skip, or go back through the track list. The current track is dynamically updated.
  - Volume and Progress Control: Users can adjust the volume and seek through the track using a progress bar.

##### Key Code Snippets:

```javascript
playPauseBtn.addEventListener("click", () => {
  isPlaying ? audio.pause() : audio.play();
  playPauseBtn.textContent = isPlaying ? "▶️ Play" : "⏸️ Pause";
  isPlaying = !isPlaying;
});
```

This snippet toggles the play/pause state of the audio element and updates the button text accordingly.

### 3. To-Do List (`todo.js`)

This module offers a straightforward interface for task management:

- Task Creation and Persistence:

  - Adding Tasks: Users submit tasks via a form, which are then saved in `localStorage` and displayed in a list.

  - Editing and Deleting Tasks: Users can edit or delete tasks, updating the displayed list and `localStorage`.

##### Key Code Snippets:

```javascript
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText) {
    const todo = { text: todoText };
    addTodoToDOM(todo);
    saveTodoToLocalStorage(todo);
    input.value = "";
  }
});
```

This code captures the task submission, creates a new todo item, and updates both the `DOM/UI` and `localStorage`.

### 4. Navigation (`script.js`)

The navigation module manages user interaction between different sections of the application:

- **Section Visibility**: Each navigation link toggles the visibility of the corresponding sections (home, calendar, music, to-do), ensuring that only one section is displayed at a time.
- **Active Link Highlighting**: The currently active section is visually distinguished, improving user navigation.

##### Key Code Snippets:

```javascript
homeLink.addEventListener("click", function () {
  homeSection.style.display = "block";
  calendarSection.style.display = "none";
  musicSection.style.display = "none";
  todoSection.style.display = "none";
});
```

This code snippet shows how clicking on the home link displays the home section while hiding others.

### Technical Flow

1. **Initialization**: Each module initializes by loading existing data from `localStorage` (if available) and rendering the UI components.

2. **User Interaction**:

   - _Users interact_ with the calendar to add or modify events, which updates the display and saves changes.
   - The music player allows users to select tracks, control playback, and manage their playlist.
   - The to-do list enables users to track tasks, with options to add, edit, and remove items.

3. **Data Persistence**: Changes made by users are saved in `localStorage`, ensuring data is preserved across sessions.

4. **Responsive Navigation**: Users can switch between different features of the application with smooth transitions and intuitive controls.

### Conclusion

This project exemplifies a well-structured web application that integrates various functionalities into a cohesive experience. It demonstrates key web development principles through the use of JavaScript for functionality, CSS for design, and HTML for structure. This documentation clarifies the logic and flow of the application, emphasizing a user-centric approach and the use of modern web technologies.
