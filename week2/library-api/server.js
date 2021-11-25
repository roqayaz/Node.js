const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

const data = require('./books.json')



app.get('/books', function(req, res){readBooks(req, res);})
app.post('/books', function(req, res){createBook(req, res);})
app.put('/books/:id', function(req, res){updateBook(req, res);})
app.delete('/books/:id', function(req, res){deleteBook(req, res);})

function isInvalid (req) {
    if ( typeof req.body == "undefined" ||
    typeof req.body.title == "undefined" ||
    typeof req.body.author == "undefined") {
        return true;
    } else {
        return false;
    }
}

function deleteBook (req, res) {
    const bookToDelete = data.find(book => book.id == req.params.id);
    if (typeof bookToDelete == "undefined" ) {
        res.status(404);
        res.send('No such book');
        return
    }
    data.splice(data.indexOf(bookToDelete), 1); 
    res.send('ok'); 
}

function updateBook(req, res) {
    if ( isInvalid(req)){
        res.status(400);
        res.send("invalid request");
        return  
  }
  const id = req.params.id;
  const bookToUpdate = data.find(book => book.id == req.params.id);
  if (typeof bookToUpdate == "undefined" ) {
      res.status(404);
      res.send('No such book');
      return
  }
  bookToUpdate.title = req.body.title;
  bookToUpdate.author = req.body.author;
  res.send('ok');
}

function createBook(req, res){
    if ( isInvalid(req)){
          res.status(400);
          res.send("invalid request");
          return  
    }
    const id = uuidv4();
    let newBook = {
        id: id,
        title: req.body.title,
        author: req.body.author
    }
    data.push(newBook);
    res.status(201);
    res.send(id);
}

function readBooks(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(data);
}


app.listen(3000)