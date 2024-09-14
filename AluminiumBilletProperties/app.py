from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load models
best_model_uts = joblib.load('models/best_model_uts.pkl')
best_model_elongation = joblib.load('models/best_model_elongation.pkl')
best_model_conductivity = joblib.load('models/best_model_conductivity.pkl')

@app.route('/')
def alu():
    return render_template('alu.html')

# Route to handle prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get the input data from the POST request

    features = [[
        data['casting_temp'],
        data['cooling_temp'],
        data['casting_speed'],
        data['bar_entry_temp'],
        data['emulsion_temp'],
        data['emulsion_pressure'],
        data['emulsion_concentration'],
        data['quench_pressure']
    ]]

    # Make predictions
    uts_prediction = best_model_uts.predict(features)[0]
    elongation_prediction = best_model_elongation.predict(features)[0]
    conductivity_prediction = best_model_conductivity.predict(features)[0]

    # Return the predictions as JSON
    return jsonify({
        'uts': uts_prediction,
        'elongation': elongation_prediction,
        'conductivity': conductivity_prediction
    })

if __name__ == '__main__':
    app.run(debug=True)
