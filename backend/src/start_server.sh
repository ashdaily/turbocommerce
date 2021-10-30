#!/bin/bash

ENV="\"$TARGET_ENV\" environment"

cecho(){
    # return colored echo
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    # ... ADD MORE COLORS
    NC="\033[0m" # No Color

    printf "$ENV: ${!1}${2} ${NC}\n"
}

if [ "$TARGET_ENV" = "local" ];
then
    # local environment

    cecho "GREEN" "getting ready..."

    # wait for postgres to start before running server
    cecho "GREEN" "waiting for db to be ready..."
    chmod +x wait_for_it.sh
    ./wait_for_it.sh turbocommerce_db:5432
    cecho "GREEN" "db is ready :)"

    # migrate db
    cecho "GREEN" "initiating db migration..."
    python3 manage.py migrate
    cecho "GREEN" "db migrated successfully :)"

    # load dummy data
    cecho "YELLOW" "loading dummy data..."
    python3 manage.py loaddata users products store
    cecho "GREEN" "loaded dummy data successfully :)"

    cecho "GREEN" "starting django server..."
    # django sslserver shouldn't be used outside of local
    python3 manage.py runsslserver 0.0.0.0:8000
else
    # non-local environment
    cecho "GREEN" "getting ready..."
    python3 manage.py runserver 0.0.0.0:8000
fi
