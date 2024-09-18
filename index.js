
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector(".close")
const bookForm = document.querySelector(".bookForm")
//Functions to add new books

const myLibrary = [];
function Book(name, author, pages, read) {
  // Constructor
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(Book) {
  // Log each book in the library
  Book.forEach(e => {
    console.log(e.name + " by " + e.author + " has " + e.pages + " pages " +" have I read it? " + e.read) 
  });
}

// Add books to the library
const AF = new Book("Animal Farm", "George Orwell", 92, "Yes");
const Silmarilion = new Book("The Silmarillion", "J.R.R. Tolkien", 432, "Not yet");
const Meditations = new Book("Meditations", "Marcus Aurelius", 192, "Yes");

// Push books into the library array
myLibrary.push(AF);
myLibrary.push(Silmarilion);
myLibrary.push(Meditations);

// Display the library
addBookToLibrary(myLibrary);

//Form Functionality 

const newBook = document.querySelector(".newBook").addEventListener("click", 
    function openForm() {
    dialog.showModal()
})
closeButton.addEventListener("click", () => {
    dialog.close();
  });

  bookForm.addEventListener()