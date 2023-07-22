// Get elements from the DOM
const noteInput = document.getElementById("noteInput");
const addButton = document.getElementById("addButton");
const noteList = document.getElementById("noteList");

// Add click event listener to the "Add" button
addButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();

    // If the note is not empty, create a new list item to display it
    if (noteText !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = noteText;
        noteList.appendChild(listItem);

        // Save the updated notes to LocalStorage
        saveNotesToLocalStorage();

        // Clear the input field after adding the note
        noteInput.value = "";
    }
});

// Add keyup event listener to the input field to enable adding notes with the Enter key
noteInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

// Function to save notes to LocalStorage
function saveNotesToLocalStorage() {
    const notes = Array.from(noteList.children).map((li) => li.textContent);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to retrieve notes from LocalStorage
function getNotesFromLocalStorage() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes && Array.isArray(notes)) {
        notes.forEach((noteText) => {
            const listItem = document.createElement("li");
            listItem.textContent = noteText;
            noteList.appendChild(listItem);
        });
    }
}

// Retrieve notes from LocalStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getNotesFromLocalStorage();
});