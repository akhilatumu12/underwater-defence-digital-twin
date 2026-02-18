const runBtn = document.getElementById("runBtn");
const tableBody = document.querySelector("#detectedTable tbody");
const predictionsDiv = document.getElementById("predictions");

runBtn.addEventListener("click", async () => {
  tableBody.innerHTML = "";
  predictionsDiv.innerHTML = "";

  try {
    const response = await fetch("http://127.0.0.1:8000/simulation");
    const data = await response.json();

    // ---------- DETECTED OBJECTS TABLE ----------
    data.detected.forEach(obj => {
      const threat = getThreatLevel(obj.type, obj.distance);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${obj.id}</td>
        <td>${obj.type}</td>
        <td>${obj.distance}</td>
        <td><span class="badge ${threat.toLowerCase()}">${threat}</span></td>
      `;
      tableBody.appendChild(row);
    });

    // ---------- PREDICTIONS CARDS ----------
    data.predictions.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.type.toUpperCase()}</h3>
        <p>ID: ${p.id}</p>
        <p>X: ${p.predicted_x}</p>
        <p>Y: ${p.predicted_y}</p>
      `;
      predictionsDiv.appendChild(card);
    });

  } catch (err) {
    alert("Backend not reachable. Is FastAPI running?");
  }
});

function getThreatLevel(type, distance) {
  if (type === "submarine") return "HIGH";
  if (type === "diver" && distance < 30) return "MEDIUM";
  return "LOW";
}
