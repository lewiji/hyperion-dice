# hyperion-dice

> Shared dice roller for RPGs compatible with the FFG SWRPG / Genesys systems

## Demo

[Demo Link to Github CI result](http://hyperion-dice-demo.s3-website.eu-west-2.amazonaws.com/)

^ note: firebase sync may be disabled in the demo - to build with firebase and enable live dice roll output, add your 
credentials in `firebase-config.json` and build/export with `yarn build`

## Features
* Easy to use, colourful UI to quickly select combinations of dice
  * motion-framer, next.js, tailwind
* Full visual readout of dice plus quick summary of total success/failure, advantage/disadvantage
* Tailwind JIT and next.js export = small exported static files
* See other currently connected players rolls in realtime
  * via Firebase Realtime DB
  
## Screenshot

![!screenshot](/public/img.png?raw=true "Screenshot")

## Attribution

* EotE dice font courtesy of: [thealexandrian.net](https://thealexandrian.net/wordpress/37660/roleplaying-games/star-wars-force-and-destiny-system-cheat-sheet)
