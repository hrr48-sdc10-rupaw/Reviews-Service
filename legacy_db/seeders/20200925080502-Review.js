var faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const fakeUser = {};
    const reviews = [];

    await queryInterface.sequelize.query(`SELECT User_games.*, Users.reviews_count, Users.username from User_games Join Users WHERE Users.id = User_games.UserId ORDER BY RAND()`)
    .then((User_games) => {
        User_games[0].forEach((result) => {
          if (!fakeUser[result.username]) {
            fakeUser[result.username] = result.reviews_count;
          } else {
            fakeUser[result.username]--;
          }
          if (fakeUser[result.username] > 0) {
            var GameId = result.GameId;
            var UserId = result.UserId;
            var UserGameId = result.id;
            var recommended = faker.random.boolean();
            if (GameId === 1) {
              if (fakeReviews.length > 0) {
                var body = fakeReviews.pop();
              }
            } else {
              var body = faker.lorem.paragraph();
            }
            var helpful_count = faker.random.number({min: 0, max: 27});
            var funny_count = faker.random.number({min: 0, max: 3});
            var comments_count = faker.random.number({min: 0, max: 9});
            var treasure = faker.random.number({min: 0, max: 1});
            var mindBlown = faker.random.number({min: 0, max: 2});
            var goldenUnicorn = faker.random.number({min: 0, max: 3});
            var deepThoughts = faker.random.number({min: 0, max: 4});
            var heartwarming = faker.random.number({min: 0, max: 5});
            var hilarious = faker.random.number({min: 0, max: 4});
            var hotTake = faker.random.number({min: 0, max: 3});
            var poetry = faker.random.number({min: 0, max: 2});
            var extraHelpful = faker.random.number({min: 0, max: 1});
            var awards = `{"Treasure":${treasure},"Mind Blown":${mindBlown},"Golden Unicorn":${goldenUnicorn},"Deep Thoughts":${deepThoughts},"Heartwarming":${heartwarming},"Hilarious":${hilarious},"Hot Take":${hotTake},"Poetry":${poetry},"Extra Helpful":${extraHelpful}}`;
            var createdAt = faker.date.between('2019-01-01', '2020-09-05');
            var updatedAt = createdAt;
            if (body) {
              reviews.push({ GameId, UserId, UserGameId, recommended, body, helpful_count, funny_count, comments_count, awards, createdAt, updatedAt });
            }
          }
        })
      })

    await queryInterface.bulkInsert('Reviews', reviews, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};

const fakeReviews = ['I mean, It is no \'Garfield Kart\', but it is ok.', 'OMG!!!! THIS GAME IS RIDICULOUS!!!!!!!!!! love it, play it repeat but there r still some bugs, if u want me to tell u about them i can do it, however , real diamonds has always a dust in it', 'Now just giving small backstory. I am a HUGE racing genre fanatic. I\'ve played every game from Gran Turismo to MX vs ATV unleashed to Need For Speed: Most Wanted to Mario Kart to Twisted Metal etc. But this game here will change the racing genre as we know it! The heart wrenching close finishes, the merciless AI is non forgiving and will destroy you at any chance they get. I even felt like some races they built alliances just to dethrone you if you went on a win streak. I do feel however the character My Melody is OP but I am fine with that becasuew my 6th grade girlfriend Angela was in love with My Melody and that reminds me of her big heart', 'It\'s just the kawaiiest', 'You should for sure buy this game.', 'truly a masterpiece', 'Aced my driver\'s test AND remembered to use the bathroom before leaving the house.', 'First thing I want to say is playing this in a £3000 racing setup is a MUST. There is no other way to experience the thrills of this game unless you have the top of the range gear. This is the closest thing to actually getting behind the wheel of a race car that you will ever experience.\nSecond of all I would like to point out that there is one major flaw in this game, I have evidence that at least half the other racers including Hello Kitty herself are involved in the Russian doping scandal, which has led to some unfair results in the tour cups. I have raised the issue to multiple government officials but every time i get laughed at and told "what is this some kinda cat racing game?" so I am starting to think it may be a lost cause.\n\nOther than that, decent game 9.5/10', 'This game is a little slow paced compared to Call of Duty and other FPS\'s, but this game is by far the best military simulator with extremely large maps and a huge variety of vehicles and weapons to choose from. Singleplayer is not so great but all of the fun and action comes from the co-op missions online. You won\'t get anywhere in this game without an organized team which is one of the many reasons why this game is so fun. Highly recommended. Blows any competition out of the water (Op Flashpoint: Dragon Rising, CoD, MoH, etc.).', '8/10\nPos:\n- fun gameplay\n- easy achievements\n- nice physics\n\n\nCons:\n- Boat physics needs to get better\n\nConclusion: Better than CS:GO\n\nMeow~', 'As someone who has three-starred all the challenges under the "Adventures with Sanrio Friends," I have to say this is one perfectly designed game! The game itself, while coming off as something that should be played by a child, is actually a true work of art. The game is challenging, and not due to the fact the controls are sticky and unresponsive at times. I believe the proper placement of apples, cupcakes, or rings are what truly defines the difficulty of this game. While you played Dota 2, wasted your time on League of Legends, I three-starred the challenges in Hello Kitty and Sanrio Friends Racing.\n\n--Do reccomend. Pick this up, you will not regret throwing a Andrew Jackson at the screen.', 'Interesting for a broken game but I wish I could create my own maps so we could have more', 'For such a racing archcasual as I am, this game is exactly what I need: simple, fun & easy. Must admit that it is somewhat underdeveloped (and probably never be improved), but it is still playable and enjoyable. I don\'t regret time spent on it.', 'This racer is easy, very easy, way toooOOoooo easy. Perfect for kids though any normal gamer will get real bored real fast. Music is awesome with real colorful worlds and a variety of racing types from car races, boats, and airplanes. There are diff modes from getting cupcakes to time trials but their all very very simple.\nThis game could have been great for all players with 2 simple fixes. Adding a difficulty setting, and adding online racing. Without those there is no challenge for regular gamers. Controller support is wonky, works in some menus while not in other menus.\nRating For Childrens: 10/10 Value: $9.99\nRating For Everyone: 01/10 Value: $0.99', 'I was rather surpirsed that there was an upcoming Hello Kitty game whilst surfing the "upcoming releases" section. This game is very simple but yet very fun.\n\nYou can do single races and tournaments worth of 4 races each, variety of quests, characters and options for costumes/accessories for them which is very cute. As you proceed in the game, the more you unlock. Great thing about this game is that you can play up to 4 players but with those in front of your screen. So far, this game overall is wonderful and is a must get for those who love racing games like Mario Kart or Sonic Transformed, Hello Kitty fans or those who just like anything cute :3\n\nHopefully the game gets more content and updates in the future as it would be nice if there was an online mode, story mode, maybe a CG Gallery worth of images to unlock too, trading cards/emoticons for the Steam Market and possibly a save button since I don\'t think there is one.. xD\n\nOverall, I really like the game the way it is right now and for a first day release, I am amazed that there are barely any bugs or issues except that player 2 choosing in multiplayer doesn\'t seem to work as in... we got the character but no confirm button for player 2 :( oh well :3', 'Now just giving small backstory. I am a HUGE racing genre fanatic. I\'ve played every game from Gran Turismo to MX vs ATV unleashed to Need For Speed: Most Wanted to Mario Kart to Twisted Metal etc. But this game here will change the racing genre as we know it! The heart wrenching close finishes, the merciless AI is non forgiving and will destroy you at any chance they get. I even felt like some races they built alliances just to dethrone you if you went on a win streak. I do feel however the character My Melody is OP but I am fine with that becasuew my 6th grade girlfriend Angela was in love with My Melody and that reminds me of her big heart\n\nNEVERTHELESS, this game has taken up so much of my time that I forgot I even owned Last of Us 2. I have quit my job to pursue this game on a major competitive level. My wife left me but that\'s just one less mouth to hear while tuning my aquaberry G wagon. All in all, I wish I had two more hands just so I could give this game 4 THUMBS UP!! 10/10 would definitely recommend.\n\nHands down, GOTY', 'I recommend this game to all kitten fans and achievement hunters! A great way to spend your time racing against friends while on some awesome kawaii characters! Note the game has NO story just casual racing. The game simply looks adorable and was a lot of fun to 100% =3*click more info to read more about review and check out some screenshots*Maps, Customization and more!\n- You can outfit the characters with different clothing styles!\n- There are different rides (boats/planes/cars) to pick from and you can even change those colors as well. Really makes it a unique experience!\n\nThere are 4 tours that I can so far play.\n4 Maps that are available and what you can use on the map as follows.\n* Hello Kitty\'s Happy Town- Cars\n* Chococat\'s Tropical Island- Boats\n* Little Twin Stars Galaxy- Planes\n* My Melody\'s Ski Resort- Cars\n\nThe game also has an [Adventure Mode] thats a series of mini games on the original main maps. In this mode you do a lot of fun things like race through a time countdown while collecting cupcakes or apples. Sometimes your task is going through as many hello kitty gates before time runs out. You are challenged to do these things on different maps and different vehicles as those I listed earlier.', 'This game was just utterly cat tastic. From kitty kart, to flying feline..... I just simply couldnt get enough of this furball out of my brain. The apples in challenge mode were like catnip.... The rings were just like a scratch post... I truly want to thank te developers for releasing my inner crazy cat person within such a colorful enjoyable game./n/nDen / den']