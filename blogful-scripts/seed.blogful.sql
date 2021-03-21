INSERT INTO blogful_articles (id, title, date_published, content)
VALUES
    (0, 'Travel',                    now() - '21 days'::INTERVAL, 'This is an article about travel.'),
    (1, 'Social Justice',            now() - '20 days'::INTERVAL, 'This is an article about social justice.'),
    (2, 'Fashion',                   now() - '19 days'::INTERVAL, 'This is an article about fashion.'),
    (3, 'Coffee',                    now() - '18 days'::INTERVAL, 'This is an article about coffee.'),
    (4, 'Food',                      now() - '17 days'::INTERVAL, 'This is an article about food.'),
    (5, 'Best Jobs',                 now() - '16 days'::INTERVAL, 'This is an articlle about the best jobs.'),
    (6, 'Interior Design',           now() - '15 days'::INTERVAL, 'This is an article about interior design.'),
    (7, 'Home Renovation',           now() - '14 days'::INTERVAL, 'This is an article about home renovation.'),
    (8, 'Web Development',           now() - '13 days'::INTERVAL, 'This is an article about web development.'),
    (9, 'Oscars',                    now() - '12 days'::INTERVAL, 'This is an article about the Oscars.'),
    (10, 'Grammys',                  now() - '11 days'::INTERVAL, 'This is an article about the Grammys.'),
    (11, 'Pandemic',                 now() - '10 days'::INTERVAL, 'This is an article about the pandemic.'),
    (12, 'Gut Health',               now() - '9 days'::INTERVAL,  'This is an article about gut health.'),
    (13, 'Charcuterie',              now() - '8 days'::INTERVAL,  'This is an article about making a charcuterie board.'),
    (14, 'Wine and Cheese Pairings', now() - '7 days'::INTERVAL,  'This is an article about wine and cheese pairings.'),
    (15, 'Summer Olympics',          now() - '6 days'::INTERVAL,  'This is an article about the summer olympics.'),
    (16, 'Best Camping Gear',        now() - '5 days'::INTERVAL,  'This is an article about the best camping gear.'),
    (17, 'Global Warming',           now() - '4 days'::INTERVAL,  'This is an article about global warming.'),
    (18, 'Netflix Releases',         now() - '3 days'::INTERVAL,  'This is an article about new Netflix releases.'),
    (19, 'Animals',                  now() - '2 days'::INTERVAL,  'This is an article about animals.')
;