const inputBookName = document.getElementById("book-name");
const booksContainer = document.getElementById("books-container");
inputBookName.addEventListener("input", getBook);
const formContainer = document.getElementById("form-container");
const form = document.querySelector("form");
const addBook = document.getElementById("add-book");
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => showForm(false));

addBook.addEventListener("click", () => showForm(true));

function showForm(e) {
  console.log(e);
  if (e) {
    formContainer.style.display = "flex";
    setTimeout(() => {
      formContainer.style.opacity = 1;
    }, 300);
  } else {
    formContainer.style.opacity = 0;
    setTimeout(() => {
      formContainer.style.display = "none";
    }, 300);
  }
}

function Book(updatedBook) {
  for (let book in updatedBook) {
    const details = document.createElement("div");
    const bookTitle = document.createElement("div");
    const info = document.createElement("div");
    const auth = document.createElement("p");
    const title = document.createElement("h1");
    const year = document.createElement("p");
    const count = document.createElement("p");
    const short = document.createElement("p");
    const pub = document.createElement("p");
    const lang = document.createElement("p");
    const btn = document.createElement("button");

    let bookName = updatedBook[book].bookName;
    let author = updatedBook[book].author;
    let published = updatedBook[book].bookPublished;
    let pageCount = updatedBook[book].pageCount;
    let shortInfo = updatedBook[book].shortInfo;
    let language = updatedBook[book].language;
    let publisher = updatedBook[book].publisher;

    title.textContent = bookName;
    auth.textContent = `by ${author}`;
    year.textContent = published;
    count.textContent = `Pages: ${pageCount}`;
    short.textContent = shortInfo;
    pub.textContent = publisher;
    lang.textContent = language;
    btn.textContent = "Read Now";

    bookTitle.appendChild(title);
    bookTitle.appendChild(lang);
    bookTitle.appendChild(auth);
    bookTitle.appendChild(year);
    bookTitle.appendChild(pub);
    bookTitle.appendChild(count);

    info.appendChild(short);
    info.appendChild(btn);

    details.appendChild(bookTitle);
    details.appendChild(info);

    short.className = "";
    btn.className =
      "border bg-green-600 text-slate-50 col-span-2 p-2 rounded-lg";
    pub.className = "col-span-3";
    lang.className = "text-right";
    auth.className = "col-span-2";
    short.className = "col-span-2";
    count.className = "text-right";
    year.className = "text-right col-span-2 ";
    info.className = "grid grid-cols-2 text-justify";
    title.className = "text-xl col-span-3";
    bookTitle.className = "grid grid-cols-4 gap-1";
    details.className =
      "w-full h-full border p-4 gap-2 shadow-sm grid bg-slate-50";

    booksContainer.appendChild(details);
  }
}

function getBook(e) {
  let name = e.target.value;
  const filterBook = myLibrary.filter((book) => {
    const nameofBook = book["bookName"]
      .toLowerCase()
      .includes(name.toLowerCase());
    const authorofBook = book["author"]
      .toLowerCase()
      .includes(name.toLowerCase());
    const yearofBook = book["bookPublished"]
      .toLowerCase()
      .includes(name.toLowerCase());
    const infoDetails = book["shortInfo"]
      .toLowerCase()
      .includes(name.toLowerCase());
    const language = book["language"]
      .toLowerCase()
      .includes(name.toLowerCase());

    return nameofBook || authorofBook || yearofBook || infoDetails || language;
  });
  resetBookList();
  if (filterBook.length === 0) {
    return (booksContainer.textContent = "No Books Found");
  } else {
    return Book(filterBook);
  }
}

function resetBookList() {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
}

function addBookToLibrary() {
  const formData = new FormData(form);
  let entries = formData.entries();

  let newbook = new Object();

  for (let [name, value] of formData.entries()) {
    newbook[name] = value;
  }
  const isDouble = myLibrary.some((book) => {
    return (
      book.bookName === newbook.bookName &&
      book.author === newbook.author &&
      book.pageCount === newbook.pageCount
    );
  });
  if (isDouble) return false;
  myLibrary.push(newbook);
  resetBookList();
  showForm(false);
  Book(myLibrary);
  return false;
}

window.onload = () => {
  Book(myLibrary);
};
