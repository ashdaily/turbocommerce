## Turbocommerce

---

Turbocommerce is a full fledged e-commerce solution written with latest cutting
edge technology. It absolutely free to use. It's written in python3, django3 and
React JS with react-bootstrap. It uses Docker as a container, poetry for managing
pip dependencies and yarn for managing react project dependencies.

---

### API Documentation

---

If you already setup backend, you can see all the API documentation under `https://0.0.0.0:8000/swagger`.
You can try out APIs to experiment request/response.

---

### How to setup, step by step guide.

---


- Setup pre-commit

    - Setup pre-commit to keep code well formatted, it's recommended but optional unless
you are contributing to this project. To read more check out [pre-commit docs](https://pre-commit.com/).

    ```
    brew install pre-commit
    pre-commit install
    ```



- Setup .env file
    - Create a `.env` file based on `.env.example file`. This file includes environment
variables that backend requires. You will need get your own `AWS_S3_REGION_NAME`,
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
Here is how to create the `.env` file.
    ```
    cd backend
    cat .env.example | tee .env
    ```
- Run backend api server and postgreql db
    ```
    docker-compose up
    ```

- Run migrations
    ```
    docker-compose run backend
    cd backend/src/
    python manage.py migrate
    ```

- Setup frontend
    ```
    cd frontend
    cat .env.example | tee .env
    yarn install
    yarn start
    ```

---

### Useful commands

---

- Run pre-commit on whole project
    ```
    pre-commit run --all-files
    ```

- Run backend tests
    ```
    docker run --rm -it turbocommerce_backend bash ./run_backend_tests.sh
    ```

- create docker postgresql db user
    ```
    docker ps # copy <container_id>
    docker exec -it <container_id> bash
    psql -U postgres -c "CREATE USER username WITH PASSWORD 'password';"
    ```

- Delete all data from postgres for a fresh start
    ```
    docker rm -f -v turbocommerce_db_1
    ```

- Travis add secret environment variables
    - make sure to install travis, `brew install travis`
    - To login, `travis login --pro --github-token <your_github_token`, generate the github_token from [here](https://github.com/settings/tokens)
    - To add a new secret env, `travis encrypt --com SOMEVAR="secretvalue"`

---

### Documentations

---

- Backend
    - [Django](https://www.djangoproject.com/)
    - [Django REST Framework](https://www.django-rest-framework.org/)
    - [Docker](https://docs.docker.com/reference/)
    - [pre-commit docs](https://pre-commit.com/)
    - [simple-jwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
    - [docker-best-practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
    - [django-rest-swagger](https://django-rest-swagger.readthedocs.io/en/latest/)

- Frontend
    - [Axios](https://github.com/axios/axios)
    - [ReactJs](https://reactjs.org/)

---

### Contribution

---

For contributing, please have a look at this
[doc](https://github.com/ashdaily/turbocommerce/blob/master/CONTRIBUTING.md).
