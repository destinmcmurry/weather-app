### Whether

A project that displays whether the weather is good in 5 different cities! Includes a homepage with an overview of all cities and more details + a 5 day forecast when selecting a city. Also, whether the weather is good!

I chose to code the site in React because of frequent re-rendering and data changes, and I chose to use local storage so that a user can use the app without signing in and their changes will persist.

## Things I'm going to change:

  - The weather API! Openweather isn't actually ~ open ~ when it comes to the forecast, so I had to improvise (and you might notice that for the 5 day forecast some places only show 4/5 days or they show the weather at night, and the temp displayed for the day is actually just a random temp that happened sometime over these 3 hour intervals -- it's janky! I wanted highs and lows to be displayed, but the data I had to work with was impossible to sort through in the time I had. It was just a little too late to go refactor the whooole thing before submitting so it's something I'm going to have to come back to later.) I'm not a huge fan of these icons either, but it was much easier than using a list not associated with the API to begin with.
  - Would like to add a wider range of messages like 'yaaas!' for clear sunny days or 'hell nah!' for tornados.
  - Also should have a 404 page that covers the case of going to a details/:placeId page without having that city on your local storage
  - Will look into using Jest as a testing framework and implement some good ole fashioned tests as well

Enjoy!