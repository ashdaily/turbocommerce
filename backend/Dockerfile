FROM python:3.9
ENV PYTHONUNBUFFERED=1
RUN mkdir /backend
ENV HOME=/backend
WORKDIR $HOME
COPY backend/src $HOME/src
COPY backend/poetry.lock $HOME
COPY backend/.env $HOME
COPY backend/run_django_tests.sh ${HOME}
COPY backend/pyproject.toml $HOME

ENV PYTHONPATH=${PYTHONPATH}:${PWD}

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
# RUN poetry update
RUN poetry install --no-interaction --no-ansi
RUN groupadd -r django && useradd -r -g django django
RUN chmod +x $HOME
RUN chown -R django $HOME
