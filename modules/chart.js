const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const width = 1000;
const height = 500;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  chartCallback: (ChartJS) => {
    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.elements.line.borderWidth = 2;
  },
});

module.exports.genGraph = async (labels, y) => {
  return new Promise(async (resolve, reject) => {
    let chartData = {
      labels: labels,

      datasets: [
        {
          borderColor: "rgb(0, 255, 132)",
          backgroundColor: "rgba(0, 255, 132, 0.25)",
          data: y,
        },
      ],
    };

    let image = await genChart(chartData);

    resolve(image);
  });
};

async function genChart(chartData) {
  const configuration = {
    type: "line",
    data: chartData,
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
      legend: {
        labels: {
          fontColor: "#FFF", //change the color
        },
      },
    },
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration);

  return image;
}
