const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

//creating connection to mysql
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "demo",
    multipleStatements: true
});

mysqlConnection.connect(err => {
    if(!err) console.log("connected...");
    else console.log('Connection failed... ',err);
});

app.get('/', (req, res) => {
    res.send('Welcome!');
});

//to query all the learners from the db
app.get('/learners', (req, res) =>{
    mysqlConnection.query('select* from learner',(err, rows, fields) =>{
        if(!err) res.send(rows);
        else console.log('Error occured... ',err)});
});

//to query specific id
app.get('/learners/:id', (req, res) => {
    mysqlConnection.query('select * from learner where id = ?',[req.params.id], (err, rows, fields) => {
        if(!err) res.send(rows);
        else console.log('Error occured... ',err);
    });
});

//inserting new request
app.post('/learners', (req, res) => {
    //creating the query
    const query = `insert into learner values(${req.body.id}, ${req.body.name}, 
    ${req.body.email}, ${req.body.course})`;    console.log(req.body);
    mysqlConnection.query('insert into learner values set ?', req.body, (err, rows, fields) => {
        if(!err) res.send("Data entry successful: ", rows);
        else console.log("Some error occured while entry... ",err);
    });
});


//updating in function definition
function insertRecord() {
    const rec = {
        // id: 3,
        name: 'x',
        email: 'x@x',
        course: 'web'
    }

    const query = `insert into learner(name, email, course) values('${rec.name}', 
        '${rec.email}', '${rec.course}')`;    console.log(query);

        mysqlConnection.query(query, (err, rows, fields) => {
            if(!err) console.log("Data entry successful: ", rows);
            else console.log("Some error occured while entry... ",err);
        });
}

//here updating the name with id
//simulating complex query to retrieve data and then use it for the next query execution
function updateRecord(id) {
    mysqlConnection.query(`select name from learner where id = ${id}`, (err, rows, fields) => {
        if(!err) {
            
            const query = `update learner set name = '${rows[0].name+id}' where id = ${id}`;

            mysqlConnection.query(query, (err, rows, fields) => {
                if(!err) console.log("Update successful: ", rows);
                 else console.log("Some error occured while entry... ",err);
            });

        }
        else console.log("Some error occured while entry... ",err);
    });
}

// insertRecord();
updateRecord(8);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));