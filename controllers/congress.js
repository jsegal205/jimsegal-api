const axios = require("axios");

const round = (val) => +val.toFixed(2);

// const getCongressSessionNumber = () => {
//   const sessionMap = {
//     [new Date(2023, 1, 3)]: 117,
//     [new Date(2021, 1, 3)]: 116,
//     [new Date(2019, 1, 3)]: 115,
//   };

//   const today = new Date();
//   const closest = Object.keys(sessionMap).reduce((a, b) => {
//     const adiff = a - today;
//     return adiff > 0 && adiff < b - today ? a : b;
//   });
//   // debugger;
//   return obj[closest];
// };

const makeApiReq = async (url) => {
  const api_res = await axios({
    url,
    headers: { "x-api-key": process.env.PROPUBLICA_API_TOKEN },
  });

  return api_res.data.results[0];
};

const computeStats = async (chamber) => {
  // const sessionNum = getCongressSessionNumber();

  const { members } = await makeApiReq(
    `https://api.propublica.org/congress/v1/116/${chamber}/members.json`
  );
  const slimMembers = slimmedResults(members);
  const genderSplit = groupBy(slimMembers, "gender");
  const partySplit = groupBy(slimMembers, "party");

  return {
    [chamber]: {
      age: {
        average: {
          all: averageAge(slimMembers),
          democrat: averageAge(partySplit.D),
          female: averageAge(genderSplit.F),
          male: averageAge(genderSplit.M),
          republican: averageAge(partySplit.R),
        },
        distrobution: ageDistrobution(slimMembers),
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
  return arr.filter((member) => member.age === age)[0];
};

const oldestAge = (arr) => {
  const age = Math.max(...arr.map((member) => member.age));
  return arr.filter((member) => member.age === age)[0];
};

const ageDistrobution = (arr) => {
  return arr.reduce((acc, current) => {
    if (!acc[current.age]) {
      acc[current.age] = {
        total: 0,
        D: 0,
        R: 0,
        M: 0,
        F: 0,
      };
    }

    acc[current.age] = {
      ...acc[current.age],
      total: (acc[current.age].total += 1),
      [current.gender]: (acc[current.age][current.gender] += 1),
      [current.party]: (acc[current.age][current.party] += 1),
    };

    return acc;
  }, {});
};

const genderStats = (gender) => {
  const total = gender.M.length + gender.F.length;
  return {
    total,
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

const _getMembers = async (chamber) => {
  const { members } = await makeApiReq(
    `https://api.propublica.org/congress/v1/116/${chamber}/members.json`
  );

  return {
    [chamber]: members,
  };
};

const _getMember = () => {
  // get member by id:

  // join in misconduct based on govtrack_id
  // https://raw.githubusercontent.com/govtrack/misconduct/master/misconduct-instances.csv

  // join in voting record by propublica_id
  // https://api.propublica.org/congress/v1/members/${pp_id}/votes.json
  return "todo";
};

const getStats = async (req, res) => {
  try {
    res.json({
      session: 116,
      ...(await computeStats("house")),
      ...(await computeStats("senate")),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getMembers = async (req, res) => {
  try {
    res.json({
      ...(await _getMembers("house")),
      ...(await _getMembers("senate")),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getMembers,
  getStats,
};
