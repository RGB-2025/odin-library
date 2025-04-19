const myLibrary = []

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

function displayBooks() {
    myLibrary.forEach(book => {
        let card = document.createElement('div');
        let title = document.createElement('h1');
        let details = document.createElement('div');
        let authorText = document.createElement('p');
        let pagesText = document.createElement('p');
        let read = document.createElement('p');

        card.className = 'card';
        details.className = 'details';
        read.setAttribute('data-read', book.read);

        [title, authorText, pagesText, read].forEach((element, i) => element.textContent = book.info()[i]);
        
        details.append(authorText, pagesText);
        card.append(title, details, read);
        document.getElementById('book-container').appendChild(card);
    })
}

addBookToLibrary('Book', 'Author', 256, false);
addBookToLibrary('Another Book', 'Another Author but Has a Really Long Name', 1, true);

displayBooks();