export APP_NAME={アプリ名}
heroku container:login
heroku create $APP_NAME --manifest
heroku git:remote -a $APP_NAME
heroku container:push selenium
heroku container:release selenium