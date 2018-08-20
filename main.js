const lights = document.querySelectorAll(".light");
let lastLight;
displayLight();

function randomLight(lights) {
  const index = Math.floor(Math.random() * lights.length);
  const light = lights[index];
  if (light === lastLight) {
    return randomLight(lights);
  }
  lastLight = light;
  return light;
}

function displayLight() {
  const light = randomLight(lights);
  console.log(light);
  light.classList.add("green");
  light.addEventListener("click", () => {
    console.log(this);
    light.classList.remove("green");
    light.removeEventListener("click", displayLight());
  });
}
