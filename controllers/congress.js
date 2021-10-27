const axios = require("axios");

const round = (val) => +val.toFixed(2);

const currentSession = 117;

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

  return api_res.data;
};

const computeStats = async (chamber) => {
  // const sessionNum = getCongressSessionNumber();

  const data = await makeApiReq(
    `https://api.propublica.org/congress/v1/${currentSession}/${chamber}/members.json`
  );
  const members = data.results[0].members;
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
        distribution: ageDistribution(slimMembers),
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
      id: member.id,
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

const ageDistribution = (arr) => {
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
  const democratMen = party.D.filter(
    (democrat) => democrat.gender === "M"
  ).length;
  const democratWomen = party.D.filter(
    (democrat) => democrat.gender === "F"
  ).length;

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

const getMisconduct = async (govtrack_id) => {
  const results = await axios({
    url: "https://raw.githubusercontent.com/govtrack/misconduct/master/misconduct-instances.csv",
  });
  if (results.data.length) {
    const csv = require("csvtojson");
    const misconducts = [];
    await csv({ output: "json" })
      .fromString(results.data)
      .subscribe((csvLine) => {
        misconducts.push(csvLine);
      })
      .on("error", (err) => {
        console.log(err);
        throw `Error processing misconduct csv: ${err}`;
      });
    return misconducts
      .filter((misconduct) => misconduct.person === govtrack_id)
      .map((misconduct) => {
        const { allegation, first_date, text, unresolved } = misconduct;
        return {
          allegation,
          allegationCategories: [
            "corruption",
            "crime",
            "elections",
            "ethics",
            "sexual-harassment-abuse",
          ].reduce((categories, currentKey) => {
            if (!!misconduct[currentKey]) {
              categories.push(currentKey);
            }
            return categories;
          }, []),
          currentStatus: !!unresolved ? "unresolved" : "resolved",
          first_date,
          text,
        };
      });
  }

  return [];
};

const _getMembers = async (chamber) => {
  const data = await makeApiReq(
    `https://api.propublica.org/congress/v1/${currentSession}/${chamber}/members.json`
  );

  const members = data.results[0].members;

  // some of the members are duped coming back from the api, and therefore
  // breaking when going to the react components.
  const dedupedMembers = members.reduce((acc, current) => {
    const dupe = acc.find(
      (item) => item.id === current.id && item.party === current.party
    );
    if (!dupe) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return {
    [chamber]: dedupedMembers.map((member) => {
      return {
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        party: member.party,
        state: member.state,
      };
    }),
  };
};

const _getMember = async (id) => {
  const data = await makeApiReq(
    `https://api.propublica.org/congress/v1/members/${id}.json`
  );

  if (!!data.errors) {
    return { error: "error" };
  }

  const memberInfo = data.results[0];

  const {
    current_party,
    date_of_birth,
    first_name,
    gender,
    last_name,
    most_recent_vote,
    roles,
    twitter_account,
    url,
    govtrack_id,
  } = memberInfo;

  const today = new Date();
  const birthDate = new Date(date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const next_election = roles.reduce(
    (curr, next) => (curr.next_election > next.next_election ? curr : next),
    ""
  ).next_election;

  const careerVoting = roles.reduce(
    (obj, term) => {
      const totalCast =
        term.total_votes - term.missed_votes - term.total_present;
      obj.careerVotesEligible += term.total_votes;
      obj.careerVotesCast += totalCast;
      obj.careerMissedVotes += term.missed_votes;
      obj.careerPresentVotes += term.total_present;
      obj.careerVotesWithParty += !!term.votes_with_party_pct
        ? Math.round(totalCast * (term.votes_with_party_pct / 100))
        : 0;
      obj.careerVotesAgainstParty += !!term.votes_against_party_pct
        ? Math.round(totalCast * (term.votes_against_party_pct / 100))
        : 0;

      return obj;
    },
    {
      careerVotesEligible: 0,
      careerVotesCast: 0,
      careerMissedVotes: 0,
      careerPresentVotes: 0,
      careerVotesWithParty: 0,
      careerVotesAgainstParty: 0,
    }
  );

  const termInfo = roles.map((term) => {
    const {
      congress,
      start_date,
      end_date,
      total_votes,
      missed_votes,
      party,
      total_present,
      votes_with_party_pct,
      votes_against_party_pct,
    } = term;

    const totalCast = total_votes - missed_votes - total_present;
    return {
      congress,
      start_date,
      end_date,
      total_votes,
      missed_votes,
      party,
      total_present,
      votesWithParty: !!votes_with_party_pct
        ? Math.round(totalCast * (votes_with_party_pct / 100))
        : 0,
      votesAgainstParty: !!votes_against_party_pct
        ? Math.round(totalCast * (votes_against_party_pct / 100))
        : 0,
    };
  });

  const misconduct = await getMisconduct(govtrack_id);

  return {
    age,
    careerVoting,
    current_party,
    date_of_birth,
    first_name,
    gender,
    initial_elected_in: roles[roles.length - 1].start_date,
    last_name,
    misconduct,
    most_recent_vote,
    next_election,
    state: roles[0].state,
    terms: roles.length,
    termInfo,
    twitter_account,
    url,
    govtrack_id,
  };

  // join in voting record by propublica_id
  // https://api.propublica.org/congress/v1/members/${pp_id}/votes.json
};

const getStats = async (req, res) => {
  try {
    res.json({
      session: currentSession,
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
    const { chamber } = req.params;
    if (chamber && chamber.match(/^(house|senate)$/)) {
      res.json({
        ...(await _getMembers(chamber)),
      });
    } else {
      res.status(404).send("Does not exist");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getMember = async (req, res) => {
  try {
    const { chamber, id } = req.params;
    if (chamber && chamber.match(/^(house|senate)$/) && id) {
      const member = await _getMember(id);
      if (member.error) {
        res.status(404).send("Does not exist");
      } else {
        res.json({
          ...member,
        });
      }
    } else {
      res.status(404).send("Does not exist");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getMember,
  getMembers,
  getStats,
};
