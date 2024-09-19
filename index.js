
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close");
const bookForm = document.querySelector(".bookForm");
const myLibrary = [];

// Constructor for books
function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Function to add books to the library and display them in the HTML
function addBookToLibrary(library) {
  const libraryDisplay = document.querySelector(".libraryDisplay");
  libraryDisplay.innerHTML = ""; // Clear previous display
  library.forEach((book, index) => {
    const bookRow = document.createElement("div");
    bookRow.classList.add("bookRow");
    bookRow.innerHTML = `
      <div>${book.name}</div>
      <div>${book.author}</div>
      <div>${book.pages}</div>
      <div>${book.read}</div>
      <button class="removeBook" data-index="${index}">Remove</button>
      <button class="toggleReadStatus" data-index="${index}">Toggle Read Status</button>
    `;
    libraryDisplay.appendChild(bookRow);
  });

  // Add event listener for the remove buttons
  document.querySelectorAll(".removeBook").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      myLibrary.splice(index, 1); // Remove book from library
      addBookToLibrary(myLibrary); // Re-render library
    });
  });

// Event listener for the toggle read status buttons
document.querySelectorAll(".toggleReadStatus").forEach(button => {
  button.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    myLibrary[index].read = myLibrary[index].read === "Yes" ? "Not yet" : "Yes"; // Toggle read status
    addBookToLibrary(myLibrary); // Re-render library to update the display
  });
});
}

// Add pre-defined books to the library
const AF = new Book("Animal Farm", "George Orwell", 92, "Yes");
const Silmarilion = new Book("The Silmarillion", "J.R.R. Tolkien", 432, "Not yet");
const Meditations = new Book("Meditations", "Marcus Aurelius", 192, "Yes");
myLibrary.push(AF, Silmarilion, Meditations);

// Display the initial library
addBookToLibrary(myLibrary);

// Open the dialog for adding a new book
document.querySelector(".newBook").addEventListener("click", () => {
  dialog.showModal();
});

// Close the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Form submission to add a new book to the library
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").value;
  
  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
  addBookToLibrary(myLibrary);
  
  dialog.close(); // Close the dialog after adding the book
  bookForm.reset(); // Reset the form fields
});