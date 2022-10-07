const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then((beersArr) => {
    const data = {
      beer: beersArr
    }
  .catch(()=> console.log("Error patata"))
    res.render('beers', data);
  })
});
app.get('/randomBeers', (req, res) => {
  punkAPI.getRandom()
  .then((randomBeers) => {
    const data = randomBeers[0]
    console.log(data)
    res.render('randomBeers', data);
    // res.render('randomBeers', randomBeers[0])
  })
});

// app.get('/randomBeers', async (req, res) => {
//   const beersArr = await punkAPI.getRandom()
//   res.render('randomBeers', beersArr[0])
// })


app.listen(3000, () => console.log('🏃‍ on port 3000'));
