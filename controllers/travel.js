import axios from "axios";
import { adminUrlBase, adminUrlQueryParams } from "../utils/constants.js";

const _getAll = async () => {
  try {
    const res = await axios
      .get(
        `${adminUrlBase}/destinations?${adminUrlQueryParams}&sort[0]=city&sort[1]=state`,
      )
      .catch((error) => {
        throw error;
      });

    const formatDestinationVisits = (visit) => {
      // dates come in like:
      // {
      //   "id": 1,
      //   "attributes": {
      //     "city": "Madrid",
      //     "state": "Madrid",
      //     "country": "Spain",
      //     "latitude": 40.416775,
      //     "longitude": -3.70379,
      //     "destination_visits": {
      //       "data": [
      //         {
      //           "id": 23,
      //           "attributes": {
      //             "visit_date": "2009-02-01"
      //          }
      //        }
      //       ]
      //     }
      //   }
      // },

      // output -> ["April 2004", "February 2002", "January 2001"]

      return visit.data
        .map((dv) => dv.attributes.visit_date)
        .sort() // ensure dates are sorted
        .reverse() // sort by date desc, ie soonest first
        .map((date) => {
          return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            timeZone: "utc", // important to not have local timezone applied and possibly show wrong date.
          });
        });
    };

    return res.data.data.map((destination) => {
      const { city, state, country, latitude, longitude, destination_visits } =
        destination.attributes;
      return {
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        visits: formatDestinationVisits(destination_visits),
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAll = async (req, res) => {
  try {
    res.json(await _getAll());
  } catch (err) {
    const { message, name } = err.response.data;
    res.json({ message, name });
  }
};

const frequented = async (req, res) => {
  const destinations = await _getAll();

  res.json(
    destinations
      .filter((d) => d.visits.length > 1)
      .sort((curr, next) => {
        if (
          curr.visits.length < next.visits.length ||
          (curr.visits.length == next.visits.length && curr.city > next.city)
        ) {
          return 1;
        }
        if (
          curr.visits.length > next.visits.length ||
          (curr.visits.length == next.visits.length && curr.city < next.city)
        ) {
          return -1;
        }

        return 0;
      })
      .map((dest) => {
        return {
          city: dest.city,
          state: dest.state,
          country: dest.country,
          visitCount: dest.visits.length,
        };
      }),
  );
};

const furthest = async (req, res) => {
  const destinations = await _getAll();

  // algorithm taken from https://stackoverflow.com/a/27943/282110
  const deg2rad = (deg) => deg * (Math.PI / 180);

  const getDistance = ({ lat, lng }) => {
    const chicago = {
      lat: 41.878114,
      lng: -87.629798,
    };

    const dLat = deg2rad(lat - chicago.lat);
    const dLon = deg2rad(lng - chicago.lng);
    const hav =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(chicago.lat)) *
        Math.cos(deg2rad(lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const angleRadians = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return 3961 * angleRadians; // 3961 is the radius of the earth in miles
  };

  res.json(
    destinations
      .map((dest) => {
        return {
          ...dest,
          distance: getDistance(dest),
        };
      })
      .reduce((curr, next) => (curr.distance > next.distance ? curr : next)),
  );
};

export { getAll, frequented, furthest };
