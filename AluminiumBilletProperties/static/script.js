function calculateProperties() {
    // Capture input values
    const castingTemp = document.getElementById('casting_temp').value;
    const coolingTemp = document.getElementById('cooling_temp').value;
    const castingSpeed = document.getElementById('casting_speed').value;
    const barEntryTemp = document.getElementById('bar_entry_temp').value;
    const emulsionTemp = document.getElementById('emulsion_temp').value;
    const emulsionPressure = document.getElementById('emulsion_pressure').value;
    const emulsionConcentration = document.getElementById('emulsion_concentration').value;
    const quenchPressure = document.getElementById('quench_pressure').value;

    // Range validations
    if (castingTemp <= 650 || castingTemp >= 750) {
        alert('Casting Temp should be between 650°C and 750°C');
        return;
    }
    if (coolingTemp <= 40 || coolingTemp >= 60) {
        alert('Cooling Temp should be between 40°C and 60°C');
        return;
    }
    if (castingSpeed <= 1 || castingSpeed >= 3) {
        alert('Casting Speed should be between 1 m/min and 3 m/min');
        return;
    }
    if (barEntryTemp <= 400 || barEntryTemp >= 500) {
        alert('Bar Entry Temp should be between 400°C and 500°C');
        return;
    }
    if (emulsionTemp <= 50 || emulsionTemp >= 70) {
        alert('Emulsion Temp should be between 50°C and 70°C');
        return;
    }
    if (emulsionPressure <= 5 || emulsionPressure >= 15) {
        alert('Emulsion Pressure should be between 5 bar and 15 bar');
        return;
    }
    if (emulsionConcentration <= 5 || emulsionConcentration >= 15) {
        alert('Emulsion Concentration should be between 5% and 15%');
        return;
    }
    if (quenchPressure <= 2 || quenchPressure >= 10) {
        alert('Quench Pressure should be between 2 bar and 10 bar');
        return;
    }

    // Prepare data to send to the model
    const formData = {
        casting_temp: parseFloat(castingTemp),
        cooling_temp: parseFloat(coolingTemp),
        casting_speed: parseFloat(castingSpeed),
        bar_entry_temp: parseFloat(barEntryTemp),
        emulsion_temp: parseFloat(emulsionTemp),
        emulsion_pressure: parseFloat(emulsionPressure),
        emulsion_concentration: parseFloat(emulsionConcentration),
        quench_pressure: parseFloat(quenchPressure)
    };

    // Make the API call to Flask
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
            <p><strong>UTS (MPa):</strong> ${data.uts}</p>
            <p><strong>Elongation (%):</strong> ${data.elongation}</p>
            <p><strong>Conductivity (% IACS):</strong> ${data.conductivity}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Error predicting properties. Please try again.';
    });
}
