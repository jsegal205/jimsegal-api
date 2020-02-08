--
-- Games seed file
--

-- seed `games` table if not already populated
DO $$
DECLARE
  rowcount integer := count(id) FROM games;
BEGIN
  IF rowcount > 0 THEN
    RAISE NOTICE 'Games table already populated. Skipping seeding...';
  ELSE
    INSERT INTO games ("name", "url", "image_url") VALUES
    ('7 Wonders','https://boardgamegeek.com/boardgame/68448/7-wonders','https://cf.geekdo-images.com/thumb/img/Grz-qM9xwxlvQGK7B-MiljtO9pQ=/fit-in/200x150/pic860217.jpg'),
    ('Castle Panic','https://boardgamegeek.com/boardgame/43443/castle-panic','https://cf.geekdo-images.com/itemrep/img/-R08U6Aeo0vBF8IapvOsQCzmKgI=/fit-in/246x300/pic496923.jpg'),
    ('Dawn of the Zeds (Third Edition)','https://boardgamegeek.com/boardgame/175095/dawn-zeds-third-edition','https://cf.geekdo-images.com/itemrep/img/5uk7-LfdLn2nRbZFgrMYYl8BOZ8=/fit-in/246x300/pic2453079.jpg'),
    ('Munchkin Deluxe','https://boardgamegeek.com/boardgame/1927/munchkin','https://cf.geekdo-images.com/itemrep/img/kPfLihonl0sXH47uh6fvXlJCQvQ=/fit-in/246x300/pic1871016.jpg'),
    ('King of Tokyo','https://boardgamegeek.com/boardgame/70323/king-tokyo','https://cf.geekdo-images.com/itemrep/img/wOXROwYuEDNoDY6LhhUPGETrSnM=/fit-in/246x300/pic3043734.jpg'),
    ('Takenoko','https://boardgamegeek.com/boardgame/70919/takenoko','https://cf.geekdo-images.com/itemrep/img/DGncmXwZ0_s3BCzsUi9AXdX2Tdk=/fit-in/246x300/pic1912529.jpg'),
    ('Tsuro of the Seas','https://boardgamegeek.com/boardgame/124172/tsuro-seas','https://cf.geekdo-images.com/itemrep/img/rhuXwuozq_RxGqmMOeqNutmkqyg=/fit-in/246x300/pic1301853.jpg'),
    ('Munchkin: Adventure Time','https://boardgamegeek.com/boardgame/146735/munchkin-adventure-time','https://cf.geekdo-images.com/itemrep/img/7kqVtIg9UFk-IIdFhHPU4I8Fz70=/fit-in/246x300/pic2020343.jpg'),
    ('Rick and Morty: Mr. Meeseeks` Box o` Fun Dice and Dares Game','https://boardgamegeek.com/boardgame/194228/rick-and-morty-mr-meeseeks-box-o-fun-dice-and-dare','https://cf.geekdo-images.com/itemrep/img/qMbnCfkHpWcsHOAFSyodRzNLXdM=/fit-in/246x300/pic3056810.png'),
    ('Blokus','https://boardgamegeek.com/boardgame/2453/blokus','https://cf.geekdo-images.com/itemrep/img/rQJ2f8rlN5dCYYyBFl0o4EwlGvU=/fit-in/246x300/pic2197702.jpg'),
    ('Jaipur','https://boardgamegeek.com/boardgame/54043/jaipur','https://cf.geekdo-images.com/itemrep/img/Q6ENW-VtBFWhypRh3zu_9WMu478=/fit-in/246x300/pic725500.jpg'),
    ('Forbidden Island','https://boardgamegeek.com/boardgame/65244/forbidden-island','https://cf.geekdo-images.com/itemrep/img/gZdBSpXLStMXF5s54qwZ5-5sIuY=/fit-in/246x300/pic646458.jpg'),
    ('Dark Dealings','https://boardgamegeek.com/boardgame/173460/dark-dealings','https://cf.geekdo-images.com/itemrep/img/X_kTDqHYHLMK9aIL7L2Siq-6ByI=/fit-in/246x300/pic2772460.jpg'),
    ('Blood Rage','https://boardgamegeek.com/boardgame/170216/blood-rage','https://cf.geekdo-images.com/itemrep/img/IBtRtMGWMXEXCVHroWqbbPT8I1g=/fit-in/246x300/pic2439223.jpg'),
    ('Spaceteam','https://boardgamegeek.com/boardgame/184491/spaceteam','https://cf.geekdo-images.com/itemrep/img/Hu5_xBE5Kj93f9wwRc8H8IXVFK8=/fit-in/246x300/pic2722498.png'),
    ('Ravine','https://boardgamegeek.com/boardgame/237728/ravine','https://cf.geekdo-images.com/itemrep/img/QurImc95mHJP3dq7xEyH0Jlpn5s=/fit-in/246x300/pic4350610.png'),
    ('Love Letter: Batman','https://boardgamegeek.com/boardgame/168584/love-letter-batman','https://cf.geekdo-images.com/itemrep/img/bx6xgepIUwMdumhSfEMGmll_5bo=/fit-in/246x300/pic2290765.jpg'),
    ('Exploding Kittens','https://boardgamegeek.com/boardgame/172225/exploding-kittens','https://cf.geekdo-images.com/itemrep/img/W6Stka2LUIxTWXMscoTqKqNosAY=/fit-in/246x300/pic2691976.png'),
    ('Regular Show Fluxx','https://boardgamegeek.com/boardgame/156108/regular-show-fluxx','https://cf.geekdo-images.com/itemrep/img/iOziA096eWCup3RyHI4ZQBTRChI=/fit-in/246x300/pic1951623.jpg'),
    ('Cards Against Humanity','https://boardgamegeek.com/boardgame/50381/cards-against-humanity','https://cf.geekdo-images.com/itemrep/img/MV1e5HmRs-KYiSxts6bcQfctDMY=/fit-in/246x300/pic2909692.jpg'),
    ('Secret Hitler','https://boardgamegeek.com/boardgame/188834/secret-hitler','https://cf.geekdo-images.com/itemrep/img/fXYFJpDCT_bF8xin02ab_7kbU74=/fit-in/246x300/pic2771488.png'),
    ('Bears Vs Babies','https://boardgamegeek.com/boardgame/211534/bears-vs-babies','https://cf.geekdo-images.com/itemrep/img/FIjpVTCL9S_y8uQGIYq7u72mg68=/fit-in/246x300/pic3231155.png'),
    ('Deluxe Pit','https://boardgamegeek.com/boardgame/140/pit','https://cf.geekdo-images.com/itemrep/img/O534gejs6P2PI2forVcAub8sHQk=/fit-in/246x300/pic423644.jpg'),
    ('Wizard School','https://boardgamegeek.com/boardgame/185154/wizard-school','https://cf.geekdo-images.com/itemrep/img/lDNlKbjGiuKZBKb2NY3nuPkDFQY=/fit-in/246x300/pic2691084.png'),
    ('Binding of Isaac: Four Souls','https://boardgamegeek.com/boardgame/255664/binding-isaac-four-souls','https://cf.geekdo-images.com/itemrep/img/sVRbM1JHI9JhdGJedg1qIZnNWkw=/fit-in/246x300/pic4197173.jpg'),
    ('Sushi Go!','https://boardgamegeek.com/boardgame/133473/sushi-go','https://cf.geekdo-images.com/itemrep/img/m0iWupkf91Km8pS-hH5EOwLPEUo=/fit-in/246x300/pic1900075.jpg'),
    ('5 Minute Dungeon','https://boardgamegeek.com/boardgame/207830/5-minute-dungeon','https://cf.geekdo-images.com/itemrep/img/AYx5N-AO9WNjb_QHUJJTpRx8kIU=/fit-in/246x300/pic3370214.jpg'),
    ('One Night Ultimate Werewolf','https://boardgamegeek.com/boardgame/147949/one-night-ultimate-werewolf','https://cf.geekdo-images.com/itemrep/img/0dzPRSXpW_gsHM1ogk4dz1MQ8hY=/fit-in/246x300/pic1809823.jpg'),
    ('Pass The Pigs','https://boardgamegeek.com/boardgame/2593/pass-pigs','https://cf.geekdo-images.com/itemrep/img/FaEJ0iNlioJJaTxoPhMTR-Ujs7w=/fit-in/246x300/pic697422.jpg'),
    ('Potato Pirates','https://boardgamegeek.com/boardgame/234465/potato-pirates','https://cf.geekdo-images.com/itemrep/img/cxuMEBKSJmRm7TY_v6ZtDn_pjmU=/fit-in/246x300/pic3731034.png'),
    ('Joking Hazard','https://boardgamegeek.com/boardgame/193621/joking-hazard','https://cf.geekdo-images.com/itemrep/img/vilCaSo5wO6FV1rYOgM-MCqPUUo=/fit-in/246x300/pic3218812.jpg'),
    ('Santa Vs Jesus','https://boardgamegeek.com/boardgame/197435/santa-vs-jesus','https://cf.geekdo-images.com/itemrep/img/mvev7NtjJDJ-BpDgsuA6lI0Qj9k=/fit-in/246x300/pic3787987.png'),
    ('Uno','https://boardgamegeek.com/boardgame/2223/uno','https://cf.geekdo-images.com/itemrep/img/NvECHeCH0GfmLdh5onMpMPH03Hc=/fit-in/246x300/pic981505.jpg'),
    ('Skip-Bo','https://boardgamegeek.com/boardgame/1269/skip-bo','https://cf.geekdo-images.com/itemrep/img/or6sr22SRh9N2GOcm--vkaUzcZI=/fit-in/246x300/pic2440687.jpg'),
    ('Ticket to Ride','https://boardgamegeek.com/boardgame/9209/ticket-ride','https://cf.geekdo-images.com/itemrep/img/-7kWI_TKVJ9M3DLFdPTfky18324=/fit-in/246x300/pic38668.jpg'),
    ('Clank!','https://boardgamegeek.com/boardgame/201808/clank-deck-building-adventure','https://cf.geekdo-images.com/itemrep/img/LIm_ppd46H3ui7_ajQ6OzAezGlA=/fit-in/246x300/pic4449526.jpg'),
    ('Mare Nostrum: Empires','https://boardgamegeek.com/boardgame/174785/mare-nostrum-empires','https://cf.geekdo-images.com/itemrep/img/pgILDgSf9kTvuaS_FPdPtHdTI4k=/fit-in/246x300/pic2648963.jpg'),
    ('Dixit','https://boardgamegeek.com/boardgame/39856/dixit','https://cf.geekdo-images.com/itemrep/img/pOiJxM-COUIpG4Rsb4vGdHH4894=/fit-in/246x300/pic3483909.jpg'),
    ('Adventure Time Card Wars: BMO vs. Lady Rainicorn','https://boardgamegeek.com/boardgame/154560/adventure-time-card-wars-bmo-vs-lady-rainicorn','https://cf.geekdo-images.com/itemrep/img/tbpeTTiD3_T_kKyuBOjCYA8TJk8=/fit-in/246x300/pic1919612.jpg'),
    ('Livestock Uprising','https://boardgamegeek.com/boardgame/153213/livestock-uprising','https://cf.geekdo-images.com/itemrep/img/B8w1c-mQr62AuBAjWYimqsbXfXc=/fit-in/246x300/pic2232226.jpg'),
    ('Terraforming Mars','https://boardgamegeek.com/boardgame/167791/terraforming-mars','https://cf.geekdo-images.com/itemrep/img/bhemoxL7PG1a_79L0D9syPTADSY=/fit-in/246x300/pic3536616.jpg'),
    ('The Fox in the Forest','https://boardgamegeek.com/boardgame/221965/fox-forest','https://cf.geekdo-images.com/itemrep/img/VYu3d9_-pmgLdQbykJtp9RKsxZg=/fit-in/246x300/pic3496085.jpg'),
    ('Star Trek Fluxx','https://boardgamegeek.com/boardgame/246531/star-trek-fluxx','https://cf.geekdo-images.com/itemrep/img/80gEE2Hs6OFWyqOPT2rkK6aUDeg=/fit-in/246x300/pic4167392.jpg'),
    ('Rick and Morty: Total Rickall','https://boardgamegeek.com/boardgame/194232/rick-and-morty-total-rickall-card-game','https://cf.geekdo-images.com/itemrep/img/Wt3peQN1lQ8Cj1WTvdD2of6Iagg=/fit-in/246x300/pic3979905.jpg'),
    ('Codenames','https://boardgamegeek.com/boardgame/178900/codenames','https://cf.geekdo-images.com/itemrep/img/j3KnNONTvPaOqyY_pwhS9C9s5bk=/fit-in/246x300/pic2582929.jpg'),
    ('Jumanji','https://boardgamegeek.com/boardgame/1751/jumanji','https://cf.geekdo-images.com/itemrep/img/v-17PzlnIXTMRWaAi7LJjOAXBhQ=/fit-in/246x300/pic6064.jpg'),
    ('Solarquest','https://boardgamegeek.com/boardgame/1836/solarquest','https://cf.geekdo-images.com/itemrep/img/CID-i1sAwPebfZmFURWuPiEqbgc=/fit-in/246x300/pic3790746.jpg');

    RAISE NOTICE 'Games Table seeded';
  END IF;
END $$;

