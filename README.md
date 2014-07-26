# Time tracker

Web-scale time tracking app.


## Trying it out

### Running locally

1. Install [Postgres](http://postgresapp.com/)
2. Run `./scripts/db-setup.js` which will create both a `ttrack_development`
   and a `ttrack_test` database on your local postgres
3. Run `./scripts/migrate up`
3. Run `npm start`

You can also use custom names but that requires you to set those up manually
and create an env file with `DATABASE_URL=YOUR CONNECTION STRING`.

Yes, this app is optimized to be easily runnable on heroku.


### Running on heroku

1. Create a new app: `heroku create`
2. Add postgres: `heroku addons:add heroku-postgresql:dev`
3. Push this repo there: `git push heroku master`
4. Run the migrations: `heroku run ./scripts/migrate up`
5. Open the app `heroku open`
