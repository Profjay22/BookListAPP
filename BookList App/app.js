class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}
class UI{
    static displayBook(){
        // const StoredBooks = [
        //     {
        //         title: 'Book one',
        //         author: 'John Doe',
        //         isbn: '3434434'
        //     },{
        //         title: 'Book two',
        //         author: 'John Doe',
        //         isbn: '4554'
        //     }
           
        // ];
        // const books = StoredBooks;
        const books = store.getBooks();
        books.forEach(function(book){ UI.addBookToList(book)});
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
         <td> ${book.title}</td>
         <td> ${book.author}</td>
         <td> ${book.isbn}</td>
         <td> <a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
        
    }
    static deleteBooks (el){
        if(el.classList.contains('delete')){
            if(confirm("Are you sure you want to delete")){
                el.parentElement.parentElement.remove();
               // console.log(parentele);
                //document.getElementById("book-list").removeChild(parentele);
            }
        }

    }

    static showAlert(message, className){

        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);
        setTimeout(function(){
            div.remove()
        }, 3000)
    }
    static clearfield (){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value='';
    }
    // static deleteBook(){

    // }
}
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    static addBook(book){ 
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }
    static removeBook(isbn){
        const books = store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', UI.displayBook) 


document.querySelector('#book-form').addEventListener("submit", function(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const book = new Book(title, author, isbn);
   
    //console.log(book);
    if(title == '' || author == '' || isbn== ''){
       UI.showAlert("please fill in all fields", "danger");

    }
    else{
        
        UI.addBookToList(book);
        store.addBook(book);
        UI.showAlert(" Book Added ", "success");
        UI.clearfield();

    }

   
    
})
document.querySelector("#book-list").addEventListener('click', function(e){
    UI.deleteBooks(e.target);
    //console.log(e.target.parentElement.previousElementSibling.innerHTML);
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert("Book Removed", "danger");

})

// document.querySelector("#book-list").addEventListener('click', function(e){
//     if(e.target.classList.contains('delete')){
//         if(confirm("Do you want to delete?")){
//             let parentele = e.target.parentElement.parentElement;
//             document.getElementById("book-list").removeChild(parentele);
//         }
//     }
// })
