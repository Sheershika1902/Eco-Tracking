const emissionFactors = {
    travel: { 
        bike: 0.034, 
        cycle: 0.0, 
        car: 0.192, 
        bus: 0.027,
        auto: 0.12,
        train: 0.05,
        walking: 0.0
    },
    electricity: { 
        grid: 0.82,
        solar: 0.0
    },
    food: { 
        vegMeal: 0.7, 
        chickenMeal: 3.3, 
        eggMeal: 1.6,
        fishMeal: 2.0,
        junkFood: 2.5
    }
};

// Add new trip row
function addTrip() {
    let container = document.getElementById("travel-container");
    let div = document.createElement("div");
    div.className = "trip-row";
    div.innerHTML = `
        <input type="number" placeholder="Distance (km)" class="trip-distance">
        <select class="trip-vehicle">
            <option value="walking">Walking</option>
            <option value="cycle">Cycle</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="auto">Auto</option>
            <option value="train">Train</option>
        </select>
    `;
    container.appendChild(div);
}

function calculate() {
    let totalTravelCO2 = 0;

    let distances = document.querySelectorAll(".trip-distance");
    let vehicles = document.querySelectorAll(".trip-vehicle");

    for (let i = 0; i < distances.length; i++) {
        let km = Number(distances[i].value);
        let vehicle = vehicles[i].value;
        if (!isNaN(km) && km > 0) {
            totalTravelCO2 += km * emissionFactors.travel[vehicle];
        }
    }

    // Electricity
    let units = Number(document.getElementById("electricity").value);
    let electricityType = document.getElementById("electricityType").value;
    let elecCO2 = units * emissionFactors.electricity[electricityType];

    // Food
    let foodType = document.getElementById("food").value;
    let foodCO2 = emissionFactors.food[foodType];

    let total = totalTravelCO2 + elecCO2 + foodCO2;

    // Result box
    let resultBox = document.getElementById("result");
    resultBox.innerText = "Total CO₂ for today: " + total.toFixed(2) + " kg";

    // Color-coded message
    if (total < 10) {
        resultBox.style.backgroundColor = "#d4edda"; // green
        resultBox.style.color = "#155724";
        resultBox.innerText += " ✅ Low footprint! Great job!";
    } else if (total <= 25) {
        resultBox.style.backgroundColor = "#fff3cd"; // yellow
        resultBox.style.color = "#856404";
        resultBox.innerText += " ⚠️ Moderate footprint. Try to reduce CO₂!";
    } else {
        resultBox.style.backgroundColor = "#f8d7da"; // red
        resultBox.style.color = "#721c24";
        resultBox.innerText += " ❌ High footprint! Consider eco-friendly actions!";
    }
}


