class Library {
  constructor() {
    this.myLibrary = [];

    // Initialize elements
    this.dialog = document.querySelector("dialog");
    this.closeButton = document.querySelector(".close");
    this.bookForm = document.querySelector(".bookForm");
    this.libraryDisplay = document.querySelector(".libraryDisplay");

    // Bind event listeners
    this.initializeEventListeners();

    // Add pre-defined books
    this.addInitialBooks();

    // Display the initial library
    this.addBookToLibrary();
  }

  // Constructor for books
  static Book = class {
    constructor(name, author, pages, read) {
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  };

  // Function to add books to the library and display them in the HTML
  addBookToLibrary() {
    this.libraryDisplay.innerHTML = "";

    this.myLibrary.forEach((book, index) => {
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
      this.libraryDisplay.appendChild(bookRow);
    });

    // Add event listener for the remove buttons
    document.querySelectorAll(".removeBook").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        this.myLibrary.splice(index, 1); // Remove book from library
        this.addBookToLibrary(); // Re-render library
      });
    });

    // Add event listener for the toggle read status buttons
    document.querySelectorAll(".toggleReadStatus").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        this.myLibrary[index].read = this.myLibrary[index].read === "Yes" ? "Not yet" : "Yes"; // Toggle read status
        this.addBookToLibrary(); // Re-render library
      });
    });
  }

  // Add pre-defined books to the library
  addInitialBooks() {
    const AF = new Library.Book("Animal Farm", "George Orwell", 92, "Yes");
    const Silmarillion = new Library.Book("The Silmarillion", "J.R.R. Tolkien", 432, "Not yet");
    const Meditations = new Library.Book("Meditations", "Marcus Aurelius", 192, "Yes");
    this.myLibrary.push(AF, Silmarillion, Meditations);
  }

  // Bind event listeners for UI actions
  initializeEventListeners() {
    // Open the dialog for adding a new book
    document.querySelector(".newBook").addEventListener("click", () => {
      this.dialog.showModal();
    });

    // Close the dialog
    this.closeButton.addEventListener("click", () => {
      this.dialog.close();
    });

    // Form submission to add a new book to the library
    this.bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#name").value;
      const author = document.querySelector("#author").value;
      const pages = document.querySelector("#pages").value;
      const read = document.querySelector("#read").value;

      const newBook = new Library.Book(name, author, pages, read);
      this.myLibrary.push(newBook);
      this.addBookToLibrary();

      this.dialog.close(); // Close the dialog after adding the book
      this.bookForm.reset(); // Reset the form fields
    });
  }
}

// Instantiate the Library class to make everything work
const libraryApp = new Library();