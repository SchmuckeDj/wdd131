

const bikes = [
  {
    type: "Commuter",
    tag: "Urban Daily",
    description:
      "Designed for urban environments, commuter e-bikes provide a comfortable riding position, efficient pedal assistance, integrated lighting systems, and reliable braking performance — making them ideal for daily transportation and city travel."
  },
  {
    type: "Mountain",
    tag: "Off-Road Pro",
    description:
      "Engineered for off-road performance, mountain e-bikes feature powerful motors, durable frames, advanced suspension systems, and high-traction tires to confidently handle trails, steep climbs, and rugged terrain."
  },
  {
    type: "Cargo",
    tag: "Heavy Duty",
    description:
      "Built for utility and heavy-duty transport, cargo e-bikes offer reinforced frames, extended wheelbases, and high-capacity battery systems, making them perfect for carrying groceries, equipment, or even passengers with ease."
  }
];

// ─────────────────────────────────────────────
// 2. DOM MANIPULATION — render bike cards
// ─────────────────────────────────────────────

/**
 * renderBikes — builds bike article cards and injects them into the DOM
 * Uses: array method (forEach), template literals, DOM manipulation
 */
function renderBikes() {
  const bikeList = document.querySelector("#bike-list");

  // ARRAY METHOD: forEach
  bikes.forEach(function (bike, index) {
    const article = document.createElement("article");
    article.classList.add("fade-in");
    article.style.transitionDelay = `${index * 0.12}s`;
    article.setAttribute("role", "listitem");

    // TEMPLATE LITERALS for HTML output
    article.innerHTML = `
      <span class="bike-num" aria-hidden="true">0${index + 1}</span>
      <span class="badge">${bike.tag}</span>
      <h3>${bike.type}</h3>
      <p>${bike.description}</p>
    `;

    // DOM MANIPULATION — appending element
    bikeList.appendChild(article);
  });
}

// ─────────────────────────────────────────────
// 3. FORM HANDLING
// ─────────────────────────────────────────────

/**
 * showMessage — displays a styled feedback message below the form
 * @param {string} text - Message content
 * @param {string} type - "success" or "error"
 */
function showMessage(text, type) {
  const message = document.querySelector("#formMessage");
  // DOM MANIPULATION — modify element class and text
  message.textContent = text;
  message.className = type;
}

/**
 * saveUserToStorage — serializes a user object and saves it to localStorage
 * @param {Object} user - The user data object to persist
 */
function saveUserToStorage(user) {
  // localStorage
  localStorage.setItem("voltrUser", JSON.stringify(user));
}

/**
 * handleFormSubmit — validates form data, saves to localStorage, shows feedback
 * @param {Event} e - The form submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();

  // DOM MANIPULATION — selecting elements
  const nameInput  = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const interest   = document.querySelector("#interest").value;
  const messageText = document.querySelector("#message").value;

  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();

  // CONDITIONAL BRANCHING — validate required fields
  if (name === "" || email === "") {
    showMessage("⚠ Please complete all required fields.", "error");
    return;
  }

  // CONDITIONAL BRANCHING — validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showMessage("⚠ Please enter a valid email address.", "error");
    return;
  }

  // CONDITIONAL BRANCHING — validate interest selection
  if (!interest) {
    showMessage("⚠ Please select a bike model.", "error");
    return;
  }

  // OBJECT — storing user data
  const user = {
    name,
    email,
    interest,
    message: messageText,
    submittedAt: new Date().toISOString()
  };

  // Save to localStorage
  saveUserToStorage(user);

  // TEMPLATE LITERAL — personalized success message
  showMessage(
    `✓ Thank you, ${name}! We'll reach out about our ${interest} lineup soon.`,
    "success"
  );

  // DOM MANIPULATION — reset form
  e.target.reset();
}

// ─────────────────────────────────────────────
// 4. SCROLL FADE-IN (IntersectionObserver)
// ─────────────────────────────────────────────

/**
 * initFadeObserver — sets up an IntersectionObserver to animate elements
 * into view when they enter the viewport
 */
function initFadeObserver() {
  const observer = new IntersectionObserver(
    function (entries) {
      // EVENT LISTENING — responds to scroll intersection events
      entries.forEach(function (entry) {
        // CONDITIONAL BRANCHING — only act when element is visible
        if (entry.isIntersecting) {
          // DOM MANIPULATION — modify element class
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  // DOM MANIPULATION — selecting all fade-in elements and observing them
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
}

// ─────────────────────────────────────────────
// 5. RETURNING USER GREETING (localStorage read)
// ─────────────────────────────────────────────

/**
 * greetReturningUser — checks localStorage for a saved user and displays
 * a welcome-back message in the form if one is found
 */
function greetReturningUser() {
  const stored = localStorage.getItem("voltrUser");

  // CONDITIONAL BRANCHING — only greet if data exists
  if (stored) {
    const savedUser = JSON.parse(stored);
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");

    // CONDITIONAL BRANCHING — pre-fill fields if they are empty
    if (nameInput && nameInput.value === "") {
      nameInput.value = savedUser.name;
    }
    if (emailInput && emailInput.value === "") {
      emailInput.value = savedUser.email;
    }

    // TEMPLATE LITERAL — welcome back message
    showMessage(
      `Welcome back, ${savedUser.name}! Your info has been pre-filled.`,
      "success"
    );
  }
}

// ─────────────────────────────────────────────
// 6. INITIALISE — runs all functions on DOMContentLoaded
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {

  // Render bike cards into the DOM
  renderBikes();

  // Initialise scroll animations
  initFadeObserver();

  // Greet returning users
  greetReturningUser();

  // EVENT LISTENER — form submission
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

});
