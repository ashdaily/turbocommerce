#!/bin/bash

ENV="\"$TARGET_ENV\" environment"

cecho(){
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    # ... ADD MORE COLORS
    NC="\033[0m" # No Color

    printf "$ENV: ${!1}${2} ${NC}\n"
}

if [ "$TARGET_ENV" = "local" ];
then
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
    python3 manage.py loaddata users products
    cecho "GREEN" "loaded dummy data successfully :)"
else
  cecho "GREEN" "getting ready..."
fi

cecho "GREEN" "starting django server..."
python3 manage.py runsslserver 0.0.0.0:8000
