# Project Name


> This project is an excercise in designing a single page application sales portal. This page will make use of interactive components to display video, images, and text content to a potential customer, making use of a service oriented architecture through a proxy server to create one seamless page.

## Related Projects

  - https://github.com/hrr48-sdc10-rupaw/Chance-Proxy
  - https://github.com/hrr48-sdc10-rupaw/body
  - https://github.com/hrr48-sdc10-rupaw/fec-hero

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installation](#installation)

## Usage
> After installation, use npm start to run the server.

## Scripts
From within the root folder:
- npm run installAll - Install all dependencies in their local folders.
- npm run initialize - Create Database and tables and seed with fake data.
- npm run clearDB - Remove all data and delete database.
- npm run build - run webpack to create a bundle.js file.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- axios
- dotenv
- nodemon
- react
- react-dom
- styled-components

### Installation

From within the root directory:

```sh
1. Find the .env files in your root folder and your database folder.
1. Change the database username and password in these 2 files to reflect your setup.
1. npm run installAll
1. npm run initialize
```

### API Endpoints (CRUD Operations)

```sh
- CREATE - POST

Create new reviews using a gameId, userId, body, and recommended value. 

endpoint: /moist-air/reviews/
query parameters: gameId
request:
  body: {
    userId: {PLACE_USERID_HERE} (integer)
    body: {PLACE_BODY_HERE} (text)
    recommended: {PLACE_RECOMMENDED_HERE} (boolean)
    }
response: 
  Success: 'Review has been posted'
  Error: Error will be displayed here. 

    
- READ - GET

Read all of the reviews for a certain game given the gameId.

endpoint: /moist-air/reviews/
query parameters: gameId
request: No body necessary
response: 
  Success:
  [
    {
        "id": 132,
        "GameId": 99,
        "UserId": 12,
        "UserGameId": 12099,
        "recommended": true,
        "body": "Nesciunt maiores iste. Saepe sed repellendus id qui laborum. Modi a dolorem sequi molestiae inventore officiis officiis magnam accusamus.",
        "helpful_count": 15,
        "funny_count": 1,
        "comments_count": 6,
        "awards": "{\"Treasure\":0,\"Mind Blown\":1,\"Golden Unicorn\":0,\"Deep Thoughts\":0,\"Heartwarming\":2,\"Hilarious\":1,\"Hot Take\":1,\"Poetry\":1,\"Extra Helpful\":1}",
        "createdAt": "2019-02-12T07:45:24.000Z",
        "updatedAt": "2019-02-12T07:45:24.000Z",
        "User": {
            "id": 12,
            "Username": "Lora.Zulauf92",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/gabrielrosser/128.jpg",
            "games_owned_count": 81,
            "reviews_count": 27,
            "createdAt": "2016-12-12T17:50:39.000Z",
            "updatedAt": "2016-12-12T17:50:39.000Z"
        },
        "Game": {
            "id": 99,
            "Title": "Handmade Handcrafted Plastic Chicken",
            "createdAt": "2010-02-12T11:14:06.000Z",
            "updatedAt": "2010-02-12T11:14:06.000Z"
        },
        "User_game": {
            "GameId": 99,
            "UserId": 12,
            "time_played": 23,
            "purchase_type": "Non-Steam Purchase",
            "createdAt": "2017-02-22T03:35:02.000Z",
            "updatedAt": "2017-02-22T03:35:02.000Z",
            "id": 12099
        }
    },
    
   ... 
] 
  Error: Error will be displayed here.
  
- UPDATE - PATCH

Update the review by specifying the gameId, userId, key that is to be changed, and the value that is to be changed along with the reviewID. 

endpoint: /moist-air/reviews/
query parameters: 
  gameId
  key (key to be changed)
  value (value to be changed to)
  reviewID
request: 
  example: 
  http://localhost:3003/moist-air/reviews/?gameId=99&key=funny&value=1&reviewID=123
response: 
  JSON object of updated review
  
- DELETE - DELETE

Delete a review by specifying the gameId and the userId. 

endpoint: /moist-air/reviews/
query parameter: gameId
body: 
  {
    userId: "PLACE_USERID_HERE
  }
response: Review was deleted
```

