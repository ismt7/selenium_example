export APP_NAME=heroku-selenium-test-0987654
heroku container:login
heroku create $APP_NAME --manifest
heroku git:remote -a $APP_NAME
heroku container:push selenium
heroku container:release selenium