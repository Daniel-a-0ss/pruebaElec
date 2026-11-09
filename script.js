const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("is-open");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const gateInputs = { a: false, b: false };
const switches = document.querySelectorAll(".switch");
const outputLamp = document.querySelector("#output-lamp");
const outputValue = document.querySelector("#output-value");
const outputState = document.querySelector("#output-state");
const labExplanation = document.querySelector("#lab-explanation");

function updateGate() {
  const result = gateInputs.a && gateInputs.b;
  const row = `${Number(gateInputs.a)}${Number(gateInputs.b)}`;

  switches.forEach((button) => {
    const isOn = gateInputs[button.dataset.input];
    button.setAttribute("aria-checked", String(isOn));
    const state = document.querySelector(`#state-${button.dataset.input}`);
    state.textContent = isOn ? "1 · ENCENDIDO" : "0 · APAGADO";
    state.style.color = isOn ? "#d5e7ad" : "";
  });

  document.querySelectorAll(".truth-table tbody tr").forEach((tableRow) => {
    tableRow.classList.toggle("is-active", tableRow.dataset.row === row);
  });

  outputLamp.classList.toggle("is-on", result);
  outputValue.textContent = String(Number(result));
  outputState.textContent = result ? "SEÑAL ACTIVA" : "SIN SEÑAL";
  labExplanation.textContent = result
    ? "Para A = 1 y B = 1, la función Y = A · B produce una salida Y = 1."
    : "Con estos valores de entrada, la función Y = A · B produce una salida Y = 0.";
}

switches.forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.dataset.input;
    gateInputs[input] = !gateInputs[input];
    updateGate();
  });
});

const decimalInput = document.querySelector("#decimal-input");
const binaryOutput = document.querySelector("#binary-output");
const convertButton = document.querySelector("#convert-button");

function convertNumber() {
  const value = Number(decimalInput.value);
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    decimalInput.setCustomValidity("Escribe un número entero entre 0 y 255.");
    decimalInput.reportValidity();
    decimalInput.setCustomValidity("");
    return;
  }
  binaryOutput.textContent = value.toString(2).padStart(8, "0");
}

convertButton.addEventListener("click", convertNumber);
decimalInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") convertNumber();
});
decimalInput.addEventListener("input", convertNumber);

const lessons = {
  atomos: {
    title: "Estructura del átomo",
    body: "La materia está formada por átomos. En el núcleo se encuentran los protones, que tienen carga positiva, y los neutrones, que no tienen carga eléctrica. Los electrones, de carga negativa, ocupan la región alrededor del núcleo. Un átomo neutro tiene igual número de protones y electrones. En ciertos materiales, algunos electrones pueden desplazarse y contribuir a la corriente eléctrica.",
    fact: "CARGA ELEMENTAL · Un protón tiene carga +e y un electrón −e, donde e ≈ 1,602 × 10⁻¹⁹ C. El neutrón es eléctricamente neutro."
  },
  coulomb: {
    title: "Carga eléctrica y ley de Coulomb",
    body: "La carga eléctrica es una propiedad de la materia y su unidad en el Sistema Internacional es el coulomb (C). Dos cargas del mismo signo se repelen y dos de signo opuesto se atraen. En el vacío, la magnitud de la fuerza electrostática depende del producto de las cargas y es inversamente proporcional al cuadrado de la distancia que las separa.",
    fact: "LEY DE COULOMB · F = k₀ |q₁q₂| / r²; k₀ ≈ 8,99 × 10⁹ N·m²/C². Si la distancia se duplica, la fuerza pasa a ser la cuarta parte."
  },
  corriente: {
    title: "Corriente, energía y unidades eléctricas",
    body: "La corriente eléctrica es la variación de carga por unidad de tiempo y se mide en amperios (A). La corriente continua (CC) mantiene su sentido; la corriente alterna (CA) invierte periódicamente su sentido; la corriente pulsante conserva un mismo sentido, pero su valor cambia con el tiempo. En los circuitos, la energía eléctrica puede transferirse y transformarse, por ejemplo, en luz, calor o movimiento.",
    fact: "MAGNITUDES Y UNIDADES SI · Carga: coulomb (C). Corriente: amperio (A). Tensión: voltio (V). Resistencia: ohmio (Ω). Potencia: vatio (W). Energía: julio (J). Energía de consumo: kilovatio-hora (kWh). P = V·I; E = P·t."
  }
};

const digitalTopics = {
  numericos: {
    title: "Sistemas numéricos y operaciones",
    body: "En un sistema posicional, cada dígito representa una potencia de la base. El sistema decimal tiene base 10; el binario, base 2 (dígitos 0 y 1); y el hexadecimal, base 16 (dígitos 0–9 y A–F). Para convertir de binario a decimal se suman las potencias de 2 correspondientes a los bits con valor 1.",
    fact: "EJEMPLOS · 1011₂ = 1·2³ + 0·2² + 1·2¹ + 1·2⁰ = 11₁₀. Suma binaria: 1011₂ + 0110₂ = 10001₂ (11 + 6 = 17)."
  },
  puertas: {
    title: "Puertas lógicas",
    body: "Cada puerta implementa una operación booleana. AND (A·B) da 1 si ambas entradas son 1; OR (A+B) da 1 si al menos una lo es; NOT (¬A) invierte su entrada. NAND y NOR son las negaciones de AND y OR. XOR da 1 cuando las entradas son diferentes; XNOR, cuando son iguales. Una tabla de verdad registra la salida para cada combinación de entradas.",
    fact: "EJEMPLO · Para A,B = 00, 01, 10, 11, la salida AND es 0, 0, 0, 1; la salida XOR es 0, 1, 1, 0. La simulación de esta página permite probar AND."
  },
  boole: {
    title: "Álgebra booleana y simplificación",
    body: "El álgebra de Boole trabaja con variables que toman los valores 0 y 1. Entre sus reglas están identidad (A·1 = A; A+0 = A), complemento (A·¬A = 0; A+¬A = 1) y absorción (A + A·B = A). Los teoremas de De Morgan permiten transformar expresiones negadas. Para funciones de varias variables, un mapa de Karnaugh ayuda a agrupar términos y obtener expresiones equivalentes más simples.",
    fact: "EJEMPLO · A·B + A·¬B = A·(B + ¬B) = A·1 = A. La función original puede implementarse con una sola señal A."
  },
  combinacional: {
    title: "Análisis y diseño de lógica combinacional",
    body: "En un circuito combinacional, las salidas dependen únicamente de los valores actuales de las entradas; no se guarda un estado previo. Una forma de diseñarlo es definir el problema, elaborar la tabla de verdad, obtener las funciones booleanas de salida, simplificarlas y dibujar el circuito equivalente con puertas lógicas.",
    fact: "EJEMPLO · Medio sumador de dos bits: la suma S = A XOR B y el acarreo C = A AND B. Con A = 1 y B = 1, S = 0 y C = 1."
  }
};

const dialog = document.querySelector(".lesson-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogBody = document.querySelector(".dialog-body");
const dialogFact = document.querySelector(".dialog-fact");

document.querySelectorAll(".lesson-open, .digital-topic-open").forEach((button) => {
  button.addEventListener("click", () => {
    const lesson = lessons[button.dataset.topic] ?? digitalTopics[button.dataset.topic];
    dialogTitle.textContent = lesson.title;
    dialogBody.textContent = lesson.body;
    dialogFact.textContent = lesson.fact;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
