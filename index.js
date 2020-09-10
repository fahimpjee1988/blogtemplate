const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require("fs")
if (fs.existsSync('./database.json')) {
    let hero = require('./database.json')
} else {
    let hero = []
}
//Option 2 : mit package
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Public serving: pictures style....
app.use(express.static('public'))
// views engine
app.set('view engine', 'ejs')

const database = require('./views/partials/navigations.json')

const database2 = require('./article.json')


const database3 = require('./article.json').slice(0,6)

const database4 = require('./views/partials/nav2.json')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    res.status(200).render('index',{dataNav:database,dataPic:database2})
})
//middleware 


app.post('/new', urlencodedParser, (req, res) => {
    console.log(req.body)
    console.log(req.body.title);  //Formular title
    console.log(req.body.author); //Formular author
    let data = [{
        id: req.body.id,
        url: req.body.url,
        title: req.body.title,
        body: req.body.body,
        published_at: req.body.published_at,
        duration: req.body.duration,
        author: req.body.author,
        author_bild: req.body.author_bild,
    }]
    data = JSON.stringify(data)
    if (!fs.existsSync('article.json')) {
        fs.writeFile('article.json', data, (err) => {
            if (err) throw err
            console.log("Data written")
        })
        res.redirect('/newarticle')
    } else {
        let myData = fs.readFileSync('article.json', 'utf-8')
        console.log(myData)
        myData = JSON.parse(myData)
        myData.push({
            id: req.body.id,
            url: req.body.url,
            title: req.body.title,
            body: req.body.body,
            published_at: req.body.published_at,
            duration: req.body.duration,
            author: req.body.author,
            author_bild: req.body.author_bild,
        })
        
        console.log(myData)
        console.log(typeof (myData));

        fs.writeFile('article.json', JSON.stringify(myData), (err) => {
            if (err) throw err
            console.log("Data written")
            fs.readFile('./article.json', 'utf-8', (err, data) => {
                console.log(data)
                hero = JSON.parse(data)
                res.redirect('/newarticle')
            })

        })
    }


})
app.get('/index/:objectitem', (req, res) => {
    
    console.log(req.params);
    console.log('test',req.params.objectitem);
    res.render('objectitem', { item: database2[req.params.objectitem],dataNav:database,dataPic:database2,dataPic2:database3 });
});
app.get('/newarticle', (req, res) => {
    res.status(200).render('newarticle',{dataNav:database,dataPic:database2,dataPic2:database3})
})

app.get('/blog', (req, res) => {
    res.status(200).render('blog',{dataNav:database,dataPic:database2,dataPic2:database3,dataNav2:database4})
})

// app.get('/objectitem/:item', (req, res) => {
//     //     console.log(req.params.item);
    
//     //     res.render('objectitem', {
//     //          objectitem: database[req.params.item],
//     //          title: database[req.params.item].title,
//     //     });

// // app.get('/objectitem', (req, res) => {
// //     res.status(200).render('objectitem',{dataNav:database,dataPic:database2})
// // })

app.listen(3002, () => {
    console.log('listening at localhost:3002');



 })


// //

// app.get('/index/:newarticle', (req, res) => {
//     res.send('user site');
//     console.log(req.params);
//     console.log(req.params.user);
// });
// app.get('/index/:objectitem', (req, res) => {
//     res.render('objectitem', { myDatabase7: database2, title: 'objectitem' });
// });
// app.get('/objectitem/:item', (req, res) => {
//     console.log(req.params.item);

//     res.render('objectitem', {
//          objectitem: database[req.params.item],
//          title: database[req.params.item].title,
//     });
// });
// app.use((req, res) => {
//     res.render('404', { title: 'Nope' });
// });
