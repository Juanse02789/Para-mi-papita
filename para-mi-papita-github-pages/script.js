const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");
const petalsContainer = document.querySelector(".petals");

secretButton.addEventListener("click", () => {
  secretMessage.classList.toggle("show");
  secretButton.textContent = secretMessage.classList.contains("show")
    ? "💛 Siempre para ti"
    : "Tengo un último detalle para ti ✨";
  burstPetals(18);
});

function createPetal(x = Math.random() * window.innerWidth, y = -30) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${x}px`;
  petal.style.top = `${y}px`;
  petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
  petal.style.animationDuration = `${5 + Math.random() * 5}s`;
  petal.style.transform = `rotate(${Math.random() * 180}deg)`;
  petalsContainer.appendChild(petal);

  petal.addEventListener("animationend", () => petal.remove());
}

function burstPetals(amount) {
  const center = window.innerWidth / 2;
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      createPetal(center + (Math.random() - 0.5) * 260, window.innerHeight * 0.72);
    }, i * 45);
  }
}

setInterval(() => {
  if (document.visibilityState === "visible") {
    createPetal();
  }
}, 900);

// Aparición suave de secciones
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 700, easing: "ease-out", fill: "both" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll("main .section").forEach(section => observer.observe(section));
