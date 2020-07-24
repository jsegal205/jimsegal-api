const axios = require("axios");

const round = (val) => +val.toFixed(2);

const getResults = async (congress) => {
  const api_res = await axios({
    url: `https://api.propublica.org/congress/v1/116/${congress}/members.json`,
    headers: { "x-api-key": process.env.PROPUBLICA_API_TOKEN },
  });
  const { members } = api_res.data.results[0];
  const slimMembers = slimmedResults(members);
  const genderSplit = groupBy(slimMembers, "gender");
  const partySplit = groupBy(slimMembers, "party");

  return {
    [congress]: {
      age: {
        average: {
          all: averageAge(slimMembers),
          democrat: averageAge(partySplit.D),
          female: averageAge(genderSplit.F),
          male: averageAge(genderSplit.M),
          republican: averageAge(partySplit.R),
        },
        oldest: oldestAge(slimMembers),
        youngest: youngestAge(slimMembers),
      },
      gender: { ...genderStats(genderSplit) },
      party: { ...partyStats(partySplit) },
    },
  };
};

const slimmedResults = (arr) =>
  arr.map((member) => {
    return {
      age: getAge(member.date_of_birth),
      date_of_birth: member.date_of_birth,
      full_name: `${member.first_name} ${member.last_name}`,
      gender: member.gender,
      party: member.party,
      state: member.state,
    };
  });

const groupBy = (arr, property) => {
  return arr.reduce((obj, member) => {
    if (!obj[member[property]]) {
      obj[member[property]] = [];
    }
    obj[member[property]].push(member);
    return obj;
  }, {});
};

const yearInMs = 3.15576e10;
const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs);

const averageAge = (arr) => {
  return round(
    arr.reduce((totalAge, member) => {
      return member.age + totalAge;
    }, 0) / arr.length
  );
};

const youngestAge = (arr) => {
  const age = Math.min(...arr.map((member) => member.age));
  return arr.filter((member) => member.age === age);
};

const oldestAge = (arr) => {
  const age = Math.max(...arr.map((member) => member.age));
  return arr.filter((member) => member.age === age);
};

const genderStats = (gender) => {
  const total = gender.M.length + gender.F.length;
  return {
    men: gender.M.length,
    percentMen: round((gender.M.length / total) * 100),
    percentWomen: round((gender.F.length / total) * 100),
    women: gender.F.length,
  };
};

const partyStats = (party) => {
  const republicanMen = party.R.filter(
    (republican) => republican.gender === "M"
  ).length;
  const republicanWomen = party.R.filter(
    (republican) => republican.gender === "F"
  ).length;
  const democratMen = party.D.filter((democrat) => democrat.gender === "M")
    .length;
  const democratWomen = party.D.filter((democrat) => democrat.gender === "F")
    .length;

  return {
    D: {
      total: party.D.length,
      men: democratMen,
      percentMen: round((democratMen / party.D.length) * 100),
      percentWomen: round((democratWomen / party.D.length) * 100),
      women: democratWomen,
    },
    R: {
      total: party.R.length,
      men: republicanMen,
      percentMen: round((republicanMen / party.R.length) * 100),
      percentWomen: round((republicanWomen / party.R.length) * 100),
      women: republicanWomen,
    },
  };
};

const getStats = async (req, res) => {
  try {
    res.json({
      ...(await getResults("house")),
      ...(await getResults("senate")),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getStats,
};
