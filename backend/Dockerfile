FROM ubuntu:20.10

ENV PYTHON_VERSION=3.9
RUN apt update --yes
RUN apt install --yes software-properties-common

# for postgres to use
RUN apt install --yes libpq-dev python${PYTHON_VERSION}-dev

# need to update ubuntu repository targets
RUN sed -i -e 's|eoan|focal|g' /etc/apt/sources.list
RUN apt update --yes
RUN add-apt-repository ppa:deadsnakes/ppa

# install python3.9 and remove the symlink for python3.8
# and create for python3.9 instead
RUN apt install --yes python${PYTHON_VERSION}
RUN apt install --yes python3-pip
RUN rm /usr/bin/python3
RUN ln -s /usr/bin/python${PYTHON_VERSION} /usr/bin/python3


RUN mkdir /backend
ENV HOME=/backend
WORKDIR $HOME
COPY backend/src $HOME/src
COPY backend/poetry.lock $HOME
COPY backend/.env $HOME
COPY run_backend_tests.sh ${HOME}
COPY backend/pyproject.toml $HOME

ENV PYTHONPATH=${PYTHONPATH}:${PWD}

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi
RUN groupadd -r django && useradd -r -g django django
RUN chmod +x $HOME
RUN chown -R django $HOME
