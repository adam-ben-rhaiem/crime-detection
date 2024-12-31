import joblib
import sys
import json
import numpy as np

# Load the model from the joblib file
model = joblib.load('modelxgboost.joblib')

# Get the input data from Node.js
input_data = json.loads(sys.argv[1])  # Data passed from Node.js

print(input_data)

# Convert the input data to a numpy array (or whatever format your model expects)
input_data = np.array(input_data)

# Make predictions
predictions = model.predict(input_data)

# Return the prediction result
print(predictions[0])  # Output the prediction result to Node.js
