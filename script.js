let notes = [];
const addNoteButton = document.getElementById("addNoteButton");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const notesContainer = document.querySelector(".notes-container");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentTextarea = document.getElementById("noteContent");

//function to createa a new note element
function createNoteElement(title, content) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("note");

  const noteTitle = document.createElement("h2");
  noteTitle.textContent = title;

  //event listener for note title to be able to edit on click
  noteTitle.addEventListener("click", function (e) {
    const input = document.createElement("input");
    input.type = "text";

    input.value = noteTitle.textContent;
    noteElement.replaceChild(input, noteTitle);
    input.focus();

    input.addEventListener("blur", function () {
      noteTitle.textContent = input.value;
      noteElement.replaceChild(noteTitle, input);
      saveNotes();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        input.blur(); // Save changes on Enter key press
      }
    });
  });
  const noteContent = document.createElement("p");
  noteContent.textContent = content;

  //event listener for note content to be able to edit on clickl
  noteContent.addEventListener("dblclick", function (e) {
    const textarea = documen.createElement("textarea");
    textarea.value = noteContent.textContent;

    noteElement.replaceChild(textarea, noteContent);
    textarea.focus();

    textarea.addEventListener("blur", function (e) {
      noteContent.textContent = textarea.value;
      noteElement.replaceChild(noteContent, textarea);
      saveNotes();
    });
    textarea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        textarea.blur(); // Save changes on Enter key press
      }
    });
  });
  noteContent.addEventListener("click", function (e) {
    const textarea = document.createElement("textarea");
    textarea.value = noteContent.textContent;
    noteElement.replaceChild(textarea, noteContent);
    textarea.focus();

    textarea.addEventListener("blur", function () {
      noteContent.textContent = textarea.value;
      noteElement.replaceChild(noteContent, textarea);
      saveNotes();
    });
    textarea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        textarea.blur(); // Save changes on Enter key press
      }
    });
  });
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteNoteButton");

  deleteButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this note?")) {
      notesContainer.removeChild(noteElement);
      saveNotes();
    }
  });

  noteElement.appendChild(noteTitle);
  noteElement.appendChild(noteContent);
  noteElement.appendChild(deleteButton);
  notesContainer.appendChild(noteElement);
  return noteElement;
}

//event listener for search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  const searchTerm = searchInput.value.trim().toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach(function (note) {
    const noteTitle = note.querySelector("h2").textContent.toLowerCase();
    const noteContent = note.querySelector("p").textContent.toLowerCase();
    if (
      noteTitle.includes(searchTerm) ||
      noteContent.includes(searchTerm) ||
      searchTerm === ""
    ) {
      note.style.display = "block"; // Show the note if it matches the search term
    } else {
      note.style.display = "none"; // Hide the note if it doesn't match
    }
  });
  saveNotes();
});

//event listener for add note button
addNoteButton.addEventListener("click", function () {
  const noteTitle = noteTitleInput.value.trim();
  const noteContent = noteContentTextarea.value.trim();

  if (noteTitle === "") {
    alert("Please enter a note title.");
    return;
  }

  if (noteContent === "") {
    alert("Please enter note content.");
    return;
  }

  // Create a new note element
  const noteElement = createNoteElement(noteTitle, noteContent);
  notesContainer.appendChild(noteElement);

  noteTitleInput.value = "";
  noteContentTextarea.value = "";

  saveNotes();
});

// save notes to local storage
function saveNotes() {
  const notes = [];
  const noteElements = document.querySelectorAll(".notes-container .note");

  noteElements.forEach(function (noteElement) {
    const noteTitle = noteElement.querySelector("h2").textContent;
    const noteContent = noteElement.querySelector("p").textContent;
    notes.push({ title: noteTitle, content: noteContent });
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load the notes from local storage
function loadNotes() {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    const parsedNotes = JSON.parse(savedNotes);

    parsedNotes.forEach(function (note) {
      const noteElement = createNoteElement(note.title, note.content);
      notesContainer.appendChild(noteElement);
    });
  }
}
loadNotes();
