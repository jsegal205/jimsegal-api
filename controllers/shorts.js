import Weather from "./weather.js";

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
  if (temperature > 80) {
    return 1000;
  }
  if (temperature < 55) {
    return -47;
  }
  if (temperature > 65) {
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
    const { maxTemperature } = await Weather.getDailyMaxTemp(41.8369, -87.6847);

    base +=
      _monthProbability(d.getMonth()) +
      _weatherProbability(Math.max(temperature, maxTemperature));

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
        {
          label: "Today's Forecasted High Temperature",
          value: `${maxTemperature} °F`,
        },
      ],
      probability,
    });
  } catch (error) {
    throw error;
  }
};

export { wearingProbability };
