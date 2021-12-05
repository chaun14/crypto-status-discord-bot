const ColorThief = require("color-thief");
const colorThief = new ColorThief();

module.exports.getAverageColor = async (image) => {
  const averageColor = await colorThief.getColor(image);

  let hexAverageColor;
  try {
    hexAverageColor = rgbToHex(averageColor[0], averageColor[1], averageColor[2]);
  } catch (error) {
    console.error(error);
  }

  return hexAverageColor;
};

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
