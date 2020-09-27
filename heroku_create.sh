#!/bin/bash

while true
do
read -p "What is the application name?: " app_name
if test -n "$app_name"
then
    break
fi
done

heroku container:login
heroku create $app_name --manifest
heroku git:remote -a $app_name
heroku container:push selenium
heroku container:release selenium