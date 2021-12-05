# Live crypto status discord bot

This is basically a script to show current crypto value and daily growth in a discord bot status

![](https://i.imgur.com/ADcUHYt.png)

## Features

- status [color](https://i.imgur.com/MLBxsP0.png) change depending to the growth rate
- select whatever crypto coin (must be on coingecko) 
- show coin price in your local currency (get list on coingecko)
- Slash commands to show [charts](https://i.imgur.com/F1QTSiy.png) 
- lightweight (using eris ofc)
- customisable
- flexible
- painless
- great
- can't take your dog btw

## Setup

- rename `config.example.js` to `config.js` and fill it correctly
- run `npm i` to install dependencies
- run `node index.js` to start it
- Invite your bot through a link like this one`https://discord.com/api/oauth2/authorize?permissions=313344&scope=applications.commands%20bot&client_id=YOURBOTIDHERE` Don't forget to replace `YOURBOTIDHERE` by your bot id.
- You have to wait an hour for slash commands to deploy on your servers

## Warning

There is currently no error handler, so it might be affected by coingecko api outage, don't hesitate to pr if you have time to loose

## Links

- contact the dev [here](https://discord.gg/dFD2VzV)
- made for the [unix discord server](https://discord.com/invite/unix)
