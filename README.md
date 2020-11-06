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
- [Django REST Social Auth 2](https://github.com/RealmTeam/django-rest-framework-social-oauth2) is based on [python social auth](http://python-social-auth.readthedocs.io/) or [django-oauth-toolkit](https://django-oauth-toolkit.readthedocs.org/), if you want to go beyond  what's already inside `django-rest-framework-social-oauth2` then check these two out instead.
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Docker](https://docs.docker.com/reference/)

#### Frontend
- [Axios](https://github.com/axios/axios)
- [ReactJs](https://reactjs.org/)


---

### Useful commands

#### Gmail access token generate:
```
curl -X POST -d "grant_type=convert_token&client_id=<django-oauth-generated-client_id>&client_secret=<django-oauth-generated-client_secret>&backend=google-oauth2&token=<google_token>" http://localhost:8000/auth/convert-token
```

#### Facebook access token generate:
```
curl -X POST -d "grant_type=convert_token&client_id=<django-oauth-generated-client_id>&client_secret=<django-oauth-generated-client_secret>&backend=facebook&token=<facebook_token>" http://localhost:8000/auth/convert-token
```

#### Retrieve token using basic auth:
```
curl -X POST -d "client_id=<client_id>&client_secret=<client_secret>&grant_type=password&username=<user_name>&password=<password>" http://localhost:8000/auth/token
```

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

#### TODO
- Fix isLogged in feature to reducer
- Improve react boiler plate
- Docker entrypoint add sleep time between db up and backend up
