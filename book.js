// Constructor for a Book
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

// Array to store books
const library = [
    new Book('J.K. Rowling', 'Harry Potter and the Philosopher\'s Stone', 223, true),
    new Book('J.R.R. Tolkien', 'The Hobbit', 310, false)
];

// Function to display books
function displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = ''; // Clear existing books
    
    library.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index; // Set data-index attribute

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
        `;

        bookContainer.appendChild(bookCard);
    });

    addEventListeners(); // Add event listeners to the buttons
}

// Function to add a new book
function addBook(event) {
    event.preventDefault(); // Prevent form from submitting

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    library.push(new Book(author, title, pages, read));
    displayBooks();
    toggleForm(); // Hide the form after adding
}

// Function to remove a book
function removeBook(index) {
    library.splice(index, 1);
    displayBooks();
}

// Function to toggle read status
function toggleReadStatus(index) {
    library[index].read = !library[index].read;
    displayBooks();
}

// Function to show/hide the form
function toggleForm() {
    const form = document.getElementById('bookForm');
    form.classList.toggle('hidden');
}

// Add event listeners to buttons
function addEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.parentElement.dataset.index;
            removeBook(index);
        });
    });

    document.querySelectorAll('.toggle-read-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.parentElement.dataset.index;
            toggleReadStatus(index);
        });
    });
}

// Set up event listeners for the form and buttons
document.getElementById('newBookButton').addEventListener('click', toggleForm);
document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('cancelButton').addEventListener('click', toggleForm);

// Initial display of books
displayBooks();
