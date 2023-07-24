const inputWord = document.getElementById("find-word");
inputWord.addEventListener("input", getBook);

const booksContainer = document.getElementById("books-container");

const formContainer = document.getElementById("form-container");
const form = document.querySelector("form");
const addBook = document.getElementById("add-book");
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => showForm(false));

addBook.addEventListener("click", () => showForm(true));

function showForm(e) {
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

function removeBook(book) {
  const indextoRemove = myLibrary.findIndex((obj) => obj.bookName === book);

  if (indextoRemove !== -1) {
    myLibrary.splice(indextoRemove, 1);
    displayBookList(myLibrary);
  } else {
    console.log("no change");
  }
}

function createBookElement(updatedBook) {
  const {
    bookName,
    author,
    bookPublished,
    publisher,
    language,
    pageCount,
    shortInfo,
  } = updatedBook;

  const card = document.createElement("div");
  card.className =
    "w-full h-full relative border p-4 gap-2 grid-rows-2 shadow-sm grid bg-slate-50";

  const cardHeader = document.createElement("div");
  cardHeader.className = "grid grid-cols-3 relative";
  card.appendChild(cardHeader);

  const titleElement = document.createElement("p");
  titleElement.className = "col-span-3 font-bold text-lg";
  titleElement.textContent = bookName;
  cardHeader.appendChild(titleElement);

  const deleteBtn = document.createElement("button");
  deleteBtn.className =
    "absolute right-0 top-0 text-xl bg-gray-200 px-2 hover:bg-red-500 hover:text-slate-50 rounded-lg";
  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", () => {
    const deleteDiv = document.createElement("div");
    deleteDiv.className =
      "w-2/3 h-2/3 transition-opacity duration-300 opacity-0 p-2 gap-x-2 text-center place-items-center bg-slate-100 grid grid-cols-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    const deleteSentence = document.createElement("p");
    deleteSentence.className = "col-span-2 text-lg";
    deleteSentence.textContent = "Are you sure you want to delete this book?";
    deleteDiv.appendChild(deleteSentence);

    const deleteElement = document.createElement("button");
    deleteElement.className =
      "hover:bg-red-700 transition-all duration-300 bg-red-500 text-slate-50 p-2 w-full rounded-lg";
    deleteElement.textContent = "Yes";
    deleteElement.addEventListener("click", () => removeBook(bookName));
    deleteDiv.appendChild(deleteElement);

    const cancelDelete = document.createElement("button");
    cancelDelete.className =
      "hover:bg-green-700 transition-all duration-300 bg-green-500 w-full  text-slate-50 p-2 rounded-lg";
    cancelDelete.textContent = "No";
    cancelDelete.addEventListener("click", () => {
      deleteDiv.style.opacity = 0;

      setTimeout(() => {
        card.removeChild(deleteDiv);
        cardHeader.appendChild(deleteBtn);
        deleteBtn.style.opacity = 1;
      }, 300);
    });
    deleteDiv.appendChild(cancelDelete);
    card.appendChild(deleteDiv);
    setTimeout(() => {
      deleteDiv.style.opacity = 1;
      cardHeader.removeChild(deleteBtn);
    }, 10);
  });
  cardHeader.appendChild(deleteBtn);

  const authorElement = document.createElement("p");
  authorElement.className = "col-span-2 font-lg";
  authorElement.textContent = author;
  cardHeader.appendChild(authorElement);

  const languageElement = document.createElement("p");
  languageElement.className = "text-right";
  languageElement.textContent = language;
  cardHeader.appendChild(languageElement);

  const publishedElement = document.createElement("p");
  publishedElement.className = "col-span-2";
  publishedElement.textContent = bookPublished;
  cardHeader.appendChild(publishedElement);

  const pageCountElement = document.createElement("p");
  pageCountElement.className = "text-right";
  pageCountElement.textContent = `Pages: ${pageCount}`;
  cardHeader.appendChild(pageCountElement);

  const publisherElement = document.createElement("p");
  publisherElement.className = "col-span-3";
  publisherElement.textContent = publisher;
  cardHeader.appendChild(publisherElement);

  const cardFooter = document.createElement("div");
  cardFooter.className = "grid place-items-end";
  card.appendChild(cardFooter);

  const shortDescElement = document.createElement("p");
  shortDescElement.textContent = shortInfo;
  cardFooter.appendChild(shortDescElement);

  const readBtn = document.createElement("button");
  readBtn.className = "bg-green-500 text-slate-50 p-2 rounded-lg";
  readBtn.textContent = "read me";
  cardFooter.appendChild(readBtn);

  // const bookTitle = document.createElement("div");
  // const info = document.createElement("div");
  // const auth = document.createElement("p");
  // const title = document.createElement("h1");
  // const year = document.createElement("p");
  // const count = document.createElement("p");
  // const short = document.createElement("p");
  // const pub = document.createElement("p");
  // const lang = document.createElement("p");
  // const btn = document.createElement("button");

  // let bookName = updatedBook[book].bookName;
  // let author = updatedBook[book].author;
  // let published = updatedBook[book].bookPublished;
  // let pageCount = updatedBook[book].pageCount;
  // let shortInfo = updatedBook[book].shortInfo;
  // let language = updatedBook[book].language;
  // let publisher = updatedBook[book].publisher;

  // title.textContent = bookName;
  // auth.textContent = `by ${author}`;
  // year.textContent = published;
  // count.textContent = `Pages: ${pageCount}`;
  // short.textContent = shortInfo;
  // pub.textContent = publisher;
  // lang.textContent = language;
  // btn.textContent = "Read Now";

  // bookTitle.appendChild(title);
  // bookTitle.appendChild(lang);
  // bookTitle.appendChild(auth);
  // bookTitle.appendChild(year);
  // bookTitle.appendChild(pub);
  // bookTitle.appendChild(count);

  // info.appendChild(short);
  // info.appendChild(btn);

  // details.appendChild(bookTitle);
  // details.appendChild(info);

  // short.className = "";
  // btn.className = "border bg-green-600 text-slate-50 col-span-2 p-2 rounded-lg";
  // pub.className = "col-span-3";
  // lang.className = "text-right";
  // auth.className = "col-span-2";
  // short.className = "col-span-2";
  // count.className = "text-right";
  // year.className = "text-right col-span-2 ";
  // info.className = "grid grid-cols-2 text-justify";
  // title.className = "text-xl col-span-3";
  // bookTitle.className = "grid grid-cols-4 gap-1";
  // details.className =
  //   "w-full h-full border p-4 gap-2 shadow-sm grid bg-slate-50";

  return card;
}

function getBook(e) {
  let word = e.target.value;
  let lowercaseInput = word.toLowerCase();
  const filterBook = myLibrary.filter((book) => {
    const {
      bookName,
      author,
      bookPublished,
      shortInfo,
      language,
      pageCount,
      publisher,
    } = book;

    const lowercaseBookName = bookName.toLowerCase();
    const lowercaseAuthor = author.toLowerCase();
    const lowercaseBookPublished = bookPublished.toLowerCase();
    const lowercaseShortInfo = shortInfo.toLowerCase();
    const lowercaseLanguage = language.toLowerCase();
    const lowercasePublisher = publisher.toLowerCase();

    return (
      lowercaseBookName.includes(lowercaseInput) ||
      lowercaseAuthor.includes(lowercaseInput) ||
      lowercaseBookPublished.includes(lowercaseInput) ||
      lowercaseShortInfo.includes(lowercaseInput) ||
      lowercaseLanguage.includes(lowercaseInput) ||
      lowercasePublisher.includes(lowercaseInput) ||
      pageCount.toString().includes(word)
    );
  });

  displayBookList(filterBook);
  if (filterBook.length === 0) {
    return (booksContainer.textContent = "No Books Found");
  } else {
    return Book(filterBook);
  }
}

function displayBookList(books) {
  if (books.length === 0) {
    return (booksContainer.innerHTML = "No Books Found");
  }
  booksContainer.innerHTML = "";
  books.forEach((book) => {
    const bookElement = createBookElement(book);
    booksContainer.appendChild(bookElement);
  });
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
  displayBookList(myLibrary);
};
