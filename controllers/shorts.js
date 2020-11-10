const Weather = require("./weather");

const _monthProbability = (month) => {
  if ([0, 1, 10, 11].includes(month)) {
    return -62;
  }
  if ([2, 9].includes(month)) {
    return 15;
  }
  if ([3, 8].includes(month)) {
    return 22;
  }
  if ([4, 5, 6, 7].includes(month)) {
    return 67;
  }
  return 0;
};

const _weatherProbability = (temperature) => {
  if (temperature < 45) {
    return -77;
  }
  if (temperature > 70) {
    return 95;
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
      criteria: [
        {
          label: "Today's Date",
          value: d.toLocaleDateString("en-US", dateOptions),
        },
        { label: "Current Temperature", value: `${temperature} °F` },
      ],
      probability,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  wearingProbability,
};
