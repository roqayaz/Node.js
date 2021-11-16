import express from 'express';
const app = express()

// Body parser middleware
app.use(express.json());

//Get Method 
app.get('/', function (req, res) {
  res.send('hello from backend to frontend!')
})
 

// Weather Route
app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;
    res.send(cityName);
  })

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The Server Is Running On Port ${PORT}`));