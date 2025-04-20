var myLibrary = []

function Book(title, author, pages, read) {
    if (!new.target) {throw Error('Please use the new operator to call this function.')};
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = () => [
        this.title,
        'by ' + this.author,
        this.pages + (this.pages == 1 ? ' page' : ' pages'),
        this.read ? 'Read' : 'Not read yet'
    ];
}

let addBookToLibrary = (title, author, pages, read) => myLibrary.push(new Book(title, author, pages, read));

/*
        <div class="card">
            <h1>Book</h1>
            <div class="details">
                <p>by <span>Author</span></p>
                <p><span>#</span> pages</p>
            </div>
            <p data-read=false>Not read yet</p>
        </div>
*/

/*
        <div class="card">
            <h1>Book</h1>
            <div class="details">
                <p>by <span>Author</span></p>
                <p><span>#</span> pages</p>
            </div>
            <p data-read=false>Not read yet</p>
            <div class="actions">
                <button class="delete">Delete Book</button>
                <button class="read">Read</button>
            </div>
        </div>
*/

let bookContainer = document.getElementById('book-container');

function displayBooks() {
    // Remove cards
    if (bookContainer.querySelector('.card')) {bookContainer.querySelectorAll('.card').forEach(element => element.remove())}

    myLibrary.forEach(book => {
        // Creating cards
        let card = document.createElement('div');
        let title = document.createElement('h1');
        let details = document.createElement('div');
        let authorText = document.createElement('p');
        let pagesText = document.createElement('p');
        let read = document.createElement('p');
        let actions = document.createElement('div');
        let readBtn = document.createElement('button')
        let deleteBtn = document.createElement('button');

        card.className = 'card';
        details.className = 'details';
        read.setAttribute('data-read', book.read ? 'true' : 'false');
        card.setAttribute('data-id', book.id);
        actions.className = 'actions';
        readBtn.className = book.read ? 'unread' : 'read';
        deleteBtn.className = 'delete';

        [title, authorText, pagesText, read].forEach((element, i) => element.textContent = book.info()[i]);
        readBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        deleteBtn.textContent = 'Delete Book';
        
        actions.append(readBtn, deleteBtn);
        details.append(authorText, pagesText);
        card.append(title, details, read, actions);
        bookContainer.appendChild(card);
    })
}

let dialog = document.getElementById('new-book-dialog');
let newBookForm = document.getElementById('new-book-form');
let createBtn = document.getElementById('create');
let closeBtn = document.getElementById('close');

closeBtn.addEventListener('click', () => dialog.close());

createBtn.addEventListener('click', () => {
    dialog.showModal();
})

newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    dialog.close();

    let bookDetails = {}

    var formData = new FormData(newBookForm);
    formData.read = document.getElementById('read').checked

    for (const [key, value] of formData) {
        bookDetails[key] ??= value || null;
        console.log(key, value)
    }

    addBookToLibrary(
        bookDetails.title,
        bookDetails.author,
        bookDetails.pages,
        bookDetails.read
    );

    newBookForm.reset();
    displayBooks();
});

// Event delegation for read and delete buttons
bookContainer.addEventListener("click", (event) => {
    // Check if the clicked element is a read/unread button
    if (event.target.classList.contains("read") || event.target.classList.contains("unread")) {
        let card = event.target.parentElement.parentElement;
        let book = myLibrary.find(book => book.id == card.getAttribute('data-id'));
        
        book.read = !book.read;
        displayBooks();
    }

    // Check if the clicked element is a delete button
    if (event.target.classList.contains("delete")) {
        let card = event.target.parentElement.parentElement;
        let bookId = card.getAttribute('data-id');
        
        myLibrary = myLibrary.filter(book => book.id !== bookId);
        displayBooks();
    }
});
