## Turbocommerce
Modern e-commerce platform built using python, django, django rest framework, reactjs, react hooks and docker.


### Setup backend
```
# project root dir, setup pre-commit
brew install pre-commit
pre-commit install

# setup .env file
cd backend
cat .env.example | tee .env


# run backend api server and postgreql db
docker-compose up

# run migrations
docker-compose run backend
cd backend/src/
python manage.py migrate
```

---

### Setup frontend
```
cd frontend
cat .env.example | tee .env
yarn install
yarn start
```
Ask [Me](https://github.com/ashdaily) for the credentials that go inside .env file or alternatively get your own.

---

### Documentations

#### Backend
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Docker](https://docs.docker.com/reference/)

#### Frontend
- [Axios](https://github.com/axios/axios)
- [ReactJs](https://reactjs.org/)


---

### Useful commands

#### run pre-commit on whole project
```
pre-commit run --all-files
```

#### create docker postgresql db user
```
docker ps # copy <container_id>
docker exec -it <container_id> bash
psql -U postgres -c "CREATE USER username WITH PASSWORD 'password';"
```

#### Delete all data from postgres
```
docker rm -f -v turbocommerce_db_1
```


#### TODO LIST
- [ ] Implement category hierachy in some other efficient manner
- [ ] Reset migrations before version 1.0.0 release
