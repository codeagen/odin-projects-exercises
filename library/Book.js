const myLibrary = [];

function Book(title,author,pages,isRead){
  this.id = crypto.randomUUID()
  this.title= title;
  this.author= author
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary(book){
  myLibrary.push(book)
}

function removeBookbyId(bookid){
  const index = myLibrary.findIndex(book =>book.id === bookid)

  if (index !== -1){
    myLibrary.splice(index,1)
    displayLibrary()
  }else{
    console.log("Book Not foundd")
  }
}

function markBookRead(bookId){
  const book = myLibrary.find(book => book.id === bookId)
  if (book){
    book.isRead = !book.isRead;
    displayLibrary()
  }
}

const Book1 = new Book('Clean Code','Robert C Martin',120,false)
const Book2 = new Book('Clean Code','Robert C Martin',120,false)
const Book3 = new Book('Clean Code','Robert C Martin',120,false)
const Book4 = new Book('Clean Code','Robert C Martin',120,false)
const Book5 = new Book('Clean Code','Robert C Martin',120,false)
const Book6 = new Book('Psychology of money','Morgan Houssel',120,true)
const Book7 = new Book('Clean Code','Robert C Martin',120,false)
const Book8 = new Book('Clean Code','Robert C Martin',120,false)
const Book9 = new Book('Clean Code','Robert C Martin',120,false)
const Book11 = new Book('Clean Code','Robert C Martin',120,false)
const Book12 = new Book('Clean Code','Robert C Martin',120,false)
const Book13 = new Book('Clean Code','Robert C Martin',120,false)
const Book14 = new Book('Clean Code','Robert C Martin',120,false)
const Book15 = new Book('Clean Code','Robert C Martin',120,false)
const Book16 = new Book('Clean Code','Robert C Martin',120,false)
const Book17 = new Book('Zero To one','Robert C Martin',120,false)

addBookToLibrary(Book1)
addBookToLibrary(Book2)
addBookToLibrary(Book3)
addBookToLibrary(Book4)
addBookToLibrary(Book5)
addBookToLibrary(Book6)
addBookToLibrary(Book7)
addBookToLibrary(Book8)
addBookToLibrary(Book9)
addBookToLibrary(Book11)
addBookToLibrary(Book12)
addBookToLibrary(Book13)
addBookToLibrary(Book14)
addBookToLibrary(Book15)
addBookToLibrary(Book16)
addBookToLibrary(Book17)

function displayLibrary(){
  const  libraryContainer = document.getElementById("library-container")
  libraryContainer.innerHTML = "";

  myLibrary.forEach(book => {
  const card = document.createElement("div")
  card.className = "book-card";

  card.innerHTML = `
  <h3>${book.title}</h3>
  <p>Author: ${book.author}</p>
  <p>Pages: ${book.pages}<p>
  <p>Status: ${book.isRead ?"Read":"Not Read"}<p>
  <button class="remove-btn" data-id="${book.id}">Remove Book</button>
  <button class="mark-btn" data-id="${book.id}" >
  ${book.isRead ? "Mark As Unread": "Mark As Read"}
  </button>
  `
  const removeButton = card.querySelector(".remove-btn")
  removeButton.addEventListener("click",()=>{
    // const id = removeButton.dataset.id
    removeBookbyId(book.id)
  })

  const markBookAsRead = card.querySelector(".mark-btn")
  markBookAsRead.addEventListener("click",()=>{
    const id  = markBookAsRead.dataset.id
    markBookRead(id)
  }) 

  libraryContainer.appendChild(card);
  })
}

displayLibrary();



//Dialog
const openDialogBtn = document.getElementById("open-dialog")
const closeDialogBtn = document.getElementById("close-dialog")
const dialog = document.getElementById("book-dialog")
const form = document.getElementById("book-form")

openDialogBtn.addEventListener("click", ()=>{
  dialog.showModal()
})

closeDialogBtn.addEventListener("click", ()=>{
  dialog.close()
})

form.addEventListener("submit" ,(e)=>{
  e.preventDefault()

  const formData = new FormData(form)
  const title =  formData.get("title")
  const author =  formData.get("author")
  const pages =  formData.get("pages")
  const isRead = formData.get("isRead") === "on";

  const newBook = new Book(title,author,pages,isRead)
  addBookToLibrary(newBook)

  displayLibrary()

  form.reset()
  dialog.close()
});



const obj = {
  a:"muaadh",
  b:2
}

const { a,b} = obj
 console.log(a)
 console.log(b)