const DEFAULT_TAB = "all";

let currentTab = DEFAULT_TAB;

let totalofBooks;
let totalofUnfinishedBooks;
let totalofFinishedBooks;

const booksContainer = document.getElementById("books-container");
const formContainer = document.getElementById("form-container");
const form = document.querySelector("form");
const loader = document.getElementById("loader");
const inputWord = document.getElementById("find-word");
inputWord.addEventListener("input", getBook);

function getTotal() {
  totalofBooks = myLibrary.length;
  totalofUnfinishedBooks = myLibrary.filter(
    (obj) => obj.isRead === false
  ).length;
  totalofFinishedBooks = myLibrary.filter((obj) => obj.isRead === true).length;

  return (
    (allBooks.textContent = `All (${totalofBooks})`),
    (unfinishedBooks.textContent = `Unfinished (${totalofUnfinishedBooks})`),
    (finishedBooks.textContent = `Finished (${totalofFinishedBooks})`)
  );
}

const allBooks = document.getElementById("all-books");
allBooks.addEventListener("click", () => {
  displayTabBooks("all");
});

const finishedBooks = document.getElementById("finished-books");
finishedBooks.addEventListener("click", () => {
  displayTabBooks("finished");
});
const unfinishedBooks = document.getElementById("unfinished-books");
unfinishedBooks.addEventListener("click", () => {
  displayTabBooks("unfinished");
});

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", () => showForm(false));

const addBook = document.getElementById("add-book");
addBook.addEventListener("click", () => showForm(true));

function displayTabBooks(e) {
  preLoad();
  getTotal();
  currentTab = e;
  let filterFinish;
  if (currentTab === "finished") {
    allBooks.classList.remove("viewed");
    finishedBooks.classList.add("viewed");
    unfinishedBooks.classList.remove("viewed");
    filterFinish = myLibrary.filter((book) => book.isRead === true);

    return displayBookList(filterFinish);
  }
  if (currentTab === "unfinished") {
    allBooks.classList.remove("viewed");
    finishedBooks.classList.remove("viewed");
    unfinishedBooks.classList.add("viewed");
    filterFinish = myLibrary.filter((book) => book.isRead === false);

    return displayBookList(filterFinish);
  }
  if (currentTab === "all") {
    allBooks.classList.add("viewed");
    finishedBooks.classList.remove("viewed");
    unfinishedBooks.classList.remove("viewed");

    return displayBookList(myLibrary);
  }
}

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
function changeReadBook(book, Bool) {
  preLoad();
  const indextoChange = myLibrary.findIndex((obj) => obj.bookName === book);

  myLibrary[indextoChange].isRead = Bool;

  displayTabBooks(currentTab);
}

function removeBook(book) {
  const indextoRemove = myLibrary.findIndex((obj) => obj.bookName === book);

  if (indextoRemove !== -1) {
    myLibrary.splice(indextoRemove, 1);
    displayTabBooks(currentTab);
  } else {
    return;
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
    isRead,
  } = updatedBook;

  const card = document.createElement("div");
  card.className =
    "w-full h-full relative border p-4 gap-2 grid-rows-2 shadow-sm grid bg-slate-50";

  const cardHeader = document.createElement("div");
  cardHeader.className = "grid grid-cols-3 relative";
  card.appendChild(cardHeader);

  const titleElement = document.createElement("p");
  titleElement.className =
    "hover:z-10 hover:bg-slate-50 hover:w-full col-span-3 font-bold text-lg";
  titleElement.textContent = bookName;
  cardHeader.appendChild(titleElement);

  const deleteBtn = document.createElement("button");
  deleteBtn.className =
    "absolute -right-5 -top-5 text-xl bg-gray-200 px-2 hover:bg-red-500 hover:text-slate-50 rounded-lg";
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
  cardFooter.className = "grid  h-full  w-full grid-cols-3";
  card.appendChild(cardFooter);

  const shortDescElement = document.createElement("p");
  shortDescElement.className = "col-span-3";
  shortDescElement.textContent = shortInfo;
  cardFooter.appendChild(shortDescElement);

  const isReadDiv = document.createElement("Div");
  isReadDiv.className = "col-span-2  ";
  const isReadBtn = document.createElement("button");
  isReadBtn.textContent = isRead ? "Finished" : "Unfinished";
  isReadBtn.className = "bg-slate-200 p-2";
  isReadBtn.addEventListener("click", () => {
    return changeReadBook(bookName, !isRead);
  });
  isReadDiv.appendChild(isReadBtn);

  cardFooter.appendChild(isReadDiv);

  const readBtn = document.createElement("button");
  readBtn.className = "bg-green-500 w-full h-10 text-slate-50 p-2 rounded-lg";
  readBtn.textContent = "More";
  cardFooter.appendChild(readBtn);

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
}

function displayBookList(books) {
  if (books.length === 0) {
    return (booksContainer.innerHTML = "No Books Found");
  }
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
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
  newbook.isRead = false;
  console.log(newbook);
  if (isDouble) return false;
  myLibrary.push(newbook);
  displayTabBooks(currentTab);
  showForm(false);
  return false;
}

function preLoad() {
  const main = document.querySelector("main");
  loader.style.opacity = 1;
  loader.style.display = "flex";

  setTimeout(() => {
    main.style.opacity = 1;
    loader.style.opacity = 0;
    loader.addEventListener("transitionend", () => {
      loader.style.display = "none";
    });
    main.style.display = "grid";
  });
}

window.onload = () => {
  displayTabBooks(DEFAULT_TAB);
};
