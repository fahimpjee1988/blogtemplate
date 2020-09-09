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

const database2 = require('./views/partials/article.json')

const database3 = require('./views/partials/article.json').slice(0,6)

const database4 = require('./views/partials/nav2.json')



app.get('/', (req, res) => {
    res.status(200).render('index',{dataNav:database,dataPic:database2})
})
//middleware 
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/new', urlencodedParser, (req, res) => {
    console.log(req.body)
    console.log(req.body.name);  //Formular name
    console.log(req.body.age); //Formular age
    let data = [{
        title: req.body.title,
        url: req.body.url,
        author: req.body.author,
        authorpic: req.body.authorpic,
        write: req.body.write,
    }]
    data = JSON.stringify(data)
    if (!fs.existsSync('database.json')) {
        fs.writeFile('database.json', data, (err) => {
            if (err) throw err
            console.log("Data written")
        })
        res.redirect('/newarticle')
    } else {
        let myData = fs.readFileSync('database.json', 'utf-8')
        console.log(myData)
        myData = JSON.parse(myData)
        myData.push({
            title: req.body.title,
            url: req.body.url,
            author: req.body.author,
            authorpic: req.body.authorpic,
            write: req.body.write,
        })
        console.log(myData)
        console.log(typeof (myData));

        fs.writeFile('database.json', JSON.stringify(myData), (err) => {
            if (err) throw err
            console.log("Data written")
            fs.readFile('./database.json', 'utf-8', (err, data) => {
                console.log(data)
                hero = JSON.parse(data)
                res.redirect('/newarticle')
            })

        })
    }


})

app.get('/newarticle', (req, res) => {
    res.status(200).render('newarticle',{dataNav:database,dataPic:database2,dataPic2:database3})
})

app.get('/blog', (req, res) => {
    res.status(200).render('blog',{dataNav:database,dataPic:database2,dataPic2:database3,dataNav2:database4})
})

app.get('/objectitem', (req, res) => {
    res.status(200).render('objectitem',{dataNav:database,dataPic:database2})
})

app.listen(3002, () => {
    console.log('listening at localhost:3002');
})