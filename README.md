# Cornbot
This repo is a Typescript api to [this repo](https://github.com/zwhittle/cornbot-ts).

Cornbot is available to members of the [FartCord](http://fartcord.com) Discord server.

This is mostly a fun side project for me and is not necessarily an example of Good Programming.

## Architecture
Cornbot is built on [discord.js](https://discord.js.org/), written in Typescript, and uses [this repo](https://github.com/zwhittle/cornbot-api) to communicate with the database.

## Installation
1. Clone this repo
2. Create a local postgresql database and user
3. Create a .env file in the root directory with these variables
```
DATABASE_URL=postgres://{user}:{password}@localhost:5432/{db_name}
```
4. `npm install`
5. `npm run dev`
6. You can now make api calls to `localhost:4000`!
