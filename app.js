const express = require("express");
const { PythonShell } = require('python-shell');
const app = express();

app.use(express.json());

// Define the port on which the server will listen
const PORT = 3000;

// Serving static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Handling a simple route to check if the server is running
app.get('/', (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/public/home.html'); // Serve the index.html
});

app.get('/position', (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/public/position.html'); // Serve the index.html
});
app.get('/predict', (req, res) => {
    // console.log(__dirname);
    res.sendFile(__dirname + '/public/predict.html'); // Serve the index.html
});
app.post('/predict', (req, res) => {
    const inputData = req.body.data;  // Input data sent in the request
  
    // Prepare the Python script parameters
    const options = {
      mode: 'text',
      pythonPath: 'python3',  // Ensure Python 3 is being used
      pythonOptions: ['-u'],  // Ensures that the output is sent immediately
      scriptPath: __dirname + 'predict.py',  // Path to your Python script
      args: [JSON.stringify(inputData)],  // Pass input data to Python script
    };
  
    // Call Python script for prediction
    PythonShell.run('predict.py', options, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error while making prediction' });
      }
      
      // The result is the prediction output from Python
      // result[0] : highest probability of the crime that will happen!
      return res.json({ crimePrediction:true, crimeType: result[0] });
    });
});
  
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
