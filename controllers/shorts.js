const { date } = require("faker");
const Weather = require("./weather");

const _monthProbability = (month) => {
  if ([1, 2, 11, 12].includes(month)) {
    return -42;
  }
  if ([3, 10].includes(month)) {
    return 14;
  }
  if ([4, 9].includes(month)) {
    return 22;
  }
  if ([5, 6, 7, 8].includes(month)) {
    return 43;
  }
  return 0;
};

const _weatherProbability = (temperature) => {
  if (temperature < 45) {
    return -44;
  }
  if (temperature > 70) {
    return 42;
  }
  return 0;
};

const wearingProbability = async (req, res) => {
  try {
    let base = 50;
    const d = new Date();
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const { temperature } = await Weather.getTemp(41.8369, -87.6847);
    base += _monthProbability(d.getMonth()) + _weatherProbability(temperature);

    let probability = base;
    if (probability >= 99) {
      probability = 99;
    }
    if (probability <= 1) {
      probability = 1;
    }
    res.json({
      date: d.toLocaleDateString("en-US", dateOptions),
      criteria: [
        {
          label: "Today's Date",
          value: d.toLocaleDateString("en-US", dateOptions),
        },
        { label: "Current Temperature", value: `${temperature} °F` },
      ],
      probability: probability,
      temperature: `${temperature} °F`,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  wearingProbability,
};
