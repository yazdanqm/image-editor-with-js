const preview = document.querySelector("#preview");
const previewScale = document.querySelector("#preview-scale");
const previewFlip = document.querySelector("#preview-flip");
const brightnessSlider = document.querySelector("#brightness");
const brightnessSliderValue = document.querySelector("#brightness-value");
const rotateSlider = document.querySelector("#rotate");
const rotateSliderValue = document.querySelector("#rotate-value");

const handleRotate = () => {
  let lastTransform = preview.style.transform;
  isVerReflected = lastTransform.includes('scaleY(-1)');
  isHorReflected = lastTransform.includes('scaleX(-1)');
  let seperateTransforms = lastTransform.split(" ");

  const rotate = rotateSlider.value;
  rotateSliderValue.innerText = rotate;

  let angle = +rotate;
  let zAngle = angle % 90;
  let zoom = 1;
  let zoomMax = 0.8;

  if (zAngle > 45) {
    zAngle = 90 - zAngle;
  }
  zoom = 1 + (zAngle / 45) * zoomMax;

  if (isVerReflected && isHorReflected) {
    preview.style.transform = `${seperateTransforms[0]} ${seperateTransforms[1]} scale(${zoom}) rotate(${rotate}deg)`;
  } else if (isHorReflected) {
    preview.style.transform = `scaleX(-1) scale(${zoom}) rotate(${rotate}deg)`;
  } else if (isVerReflected) {
    preview.style.transform = `scaleY(-1) scale(${zoom}) rotate(${rotate}deg)`;
  } else {
    preview.style.transform = `scale(${zoom}) rotate(${rotate}deg)`;
  }

};

const handleBrightness = () => {
  let lastFilter = preview.style.filter;
  let seperateFilters = lastFilter.split(" ");
  const brightness = brightnessSlider.value;
  brightnessSliderValue.innerText = brightness;

  if (lastFilter.length === 0) {
    preview.style.filter = `brightness(${brightness})`;
  } else if (seperateFilters.length > 0) {
    preview.style.filter = `${seperateFilters[0]} brightness(${brightness})`;
  }
};

const handleFilter = (e) => {
  brightnessSlider.value = 1;
  brightnessSliderValue.innerHTML = 1;
  const { target } = e;
  const { id: filter } = target;

  if (filter === "none") {
    preview.style.removeProperty("filter");
  } else if (filter === "hue-rotate") {
    preview.style.filter = `${filter}(90deg)`;
  } else if (filter === "contrast" || filter === "saturate") {
    preview.style.filter = `${filter}(2)`;
  } else if (filter === "blur") {
    preview.style.filter = `${filter}(2px)`;
  } else {
    preview.style.filter = `${filter}(1)`;
  }
};

const handleFlip = (flip) => {
  let lastFilter = preview.style.transform;
  let seperateFilters = lastFilter.split(" ");
  if (flip === "horizontal") {
    if (seperateFilters.includes("scaleX(-1)")) {
      preview.style.transform = lastFilter.replace("scaleX(-1)", "");
    } else {
      preview.style.transform = "scaleX(-1) " + lastFilter;
    }
  } else if (flip === "vertical") {
    if (seperateFilters.includes("scaleY(-1)")) {
      preview.style.transform = lastFilter.replace("scaleY(-1)", "");
    } else {
      preview.style.transform = "scaleY(-1) " + lastFilter ;
    }
  }
};

const handleMouseEnter = () => {
  previewScale.style.scale = 2;
};

const handleMouseLeave = () => {
  previewScale.style.removeProperty("scale");
};

const handleMouseMove = (e) => {
  const imageWidth = previewScale.offsetWidth;
  const imageHeight = previewScale.offsetHeight;
  const imageOffsetTop = previewScale.offsetTop;
  const imageOffsetLeft = previewScale.offsetLeft;
  const pageX = e.pageX;
  const pageY = e.pageY;

  let myY = pageY - imageOffsetTop;
  let myX = pageX - imageOffsetLeft;

  previewScale.style.transformOrigin = `${myX}px ${myY}px`;
};
