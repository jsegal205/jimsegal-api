--
-- Destinations seed file
--

-- create function for converting integers to months
drop function if exists to_month(integer);
create function to_month(integer) returns varchar as
$$
    select to_char(to_timestamp(to_char($1, '999'), 'MM'), 'Month');
$$ language sql;

-- try to start seeding destinations and destination visits tables
DO $$
DECLARE
  rowcount integer := count(id) FROM destinations;
BEGIN
  IF rowcount > 0 THEN
    RAISE NOTICE 'Destinations table already populated. Skipping seeding...';
  ELSE
    DO '
    DECLARE
        destId integer;
    BEGIN

    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''St. Pete Beach'',''FL'',''USA'',27.739783,-82.752435)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2011),(destId, 5, 2008);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''New Orleans'',''LA'',''USA'',29.959882,-90.067956)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2017);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''San Antonio'',''TX'',''USA'',29.424122,-98.493628)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 2, 2018),(destId, 2, 2016),(destId, 4, 2014);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Austin'',''TX'',''USA'',30.267153,-97.743061)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 2, 2018),(destId, 4, 2014);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Los Angeles'',''CA'',''USA'',34.052234,-118.243685)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Pismo Beach'',''CA'',''USA'',35.142753,-120.641283)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Carmel'',''CA'',''USA'',36.555239,-121.923288)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''San Fransisco'',''CA'',''USA'',37.774929,-122.419416)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Las Vegas'',''NV'',''USA'',36.110524,-115.172896)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 4, 2013),(destId, 5, 2010);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Portland'',''OR'',''USA'',45.523062,-122.676482)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 7, 2015);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Rochester'',''MN'',''USA'',44.012122,-92.480199)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 6, 2015);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Galena'',''IL'',''USA'',42.416674,-90.429017)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 8, 2010);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Spooner'',''WI'',''USA'',45.822448,-91.889343)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 6, 2019),(destId, 5, 2019),(destId, 7, 2018),(destId, 8, 2017),(destId, 6, 2017);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Milwaukee'',''WI'',''USA'',43.038902,-87.906474)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 4, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Indianapolis'',''IN'',''USA'',39.768403,-86.158068)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 2, 2009);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Detroit'',''MI'',''USA'',42.331427,-83.045754)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 4, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Niagara Falls'',''NY'',''USA'',43.086818,-79.066544)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 4, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Rochester'',''NY'',''USA'',43.156578,-77.608847)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 4, 2012);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Washington'',''DC'',''USA'',38.907192,-77.036871)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2013);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Denver'',''CO'',''USA'',39.739236,-104.990251)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 5, 2015);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Rome'',''Rome'',''Italy'',41.902783,12.496366)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2014);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Florence'',''Florence'',''Italy'',43.76956,11.255814)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2014);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Venice'',''Venice'',''Italy'',45.440847,12.315515)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2014);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Madrid'',''Madrid'',''Spain'',40.416775,-3.70379)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 5, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Toledo'',''Toledo'',''Spain'',39.862832,-4.027323)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 5, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Barcelona'',''Barcelona'',''Spain'',41.385064,2.173403)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 5, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Seville'',''Seville'',''Spain'',37.389092,-5.984459)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 5, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Fort Lauderdale'',''FL'',''USA'',26.122439,-80.137317)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 11, 2016);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''St. Louis'',''MO'',''USA'',38.627003,-90.199404)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 7, 2009);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Godfrey'',''IL'',''USA'',38.955603,-90.186776)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 7, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''West Branson'',''MO'',''USA'',36.685863,-93.330578)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 7, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Toronto'',''Ontario'',''Canada'',43.64535,-79.380215)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 10, 2018);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Orlando'',''FL'',''USA'',28.47521,-81.47493)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 1, 2019);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Honolulu'',''HI'',''USA'',21.306944,-157.858337)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 8, 2019);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Kaanapali'',''HI'',''USA'',20.92269,-156.69296)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 8, 2019);


    INSERT INTO destinations ("city", "state", "country", "lat", "long")
      VALUES (''Columbus'',''OH'',''USA'',39.9563,-83.0041)
      RETURNING id INTO destId;

    INSERT INTO destination_visits (destination_id, month, year)
      VALUES (destId, 9, 2019),(destId, 10, 2019),(destId, 12, 2019);

    END ';

    RAISE NOTICE 'Destinations table seeded';
  END IF;
END $$;
