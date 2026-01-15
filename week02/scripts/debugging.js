const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area');

const PI = 3.14159;
let area = 0;
let radius = 10;

// Primer cálculo
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;

// Segundo cálculo
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;
