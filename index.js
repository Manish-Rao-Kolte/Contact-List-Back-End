const express = require('express');
const path = require('path');
const port = 8500;
const db = require('./config/mongoose');
const Contact = require('./models/contact'); 

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// below mentioned code is when we are not interacting with database.

// var contactList = [
//     {name: "Manish", phone: "1234566"},
//     {name: "Kapil", phone: "12345454"},
//     {name: "Savita", phone: "56478354"}
// ];

app.get('/', function(req, res){
    Contact.find().then(function(contacts){
        return res.render('home', {title: 'Contact list app', contact_list: contacts});
    });
    
});

app.post('/create_contact', function(req, res){
    // contactList.push(req.body);
    // return res.redirect('back');
    console.log(req.body);
    Contact.create(req.body);
    return res.redirect('back');
});

app.get('/delete_contact/', async function(req,res){

    // below mentioned code is when we are not interacting with database. we were getting query and finding data in internal array.
    // const value = contactList.map(function(o) { return o.phone; });
    // const index = value.indexOf(req.query.phone);
    // contactList.splice(index, 1);

    // await works with async function so added async in above callback
    await Contact.findByIdAndDelete(req.query.id);
    return res.redirect('back');
});


app.listen(port, function(err){
        if(err){
            console.log("Error", err);
            return;
        }
        console.log("Express Server is running smoothly on port:", port);
});
