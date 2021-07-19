FROM ubuntu:20.10

# Motivated by 12 factor app ideology, we want to maintain keep docker images
# similar around different environments like local, testing, etc.
# Hence, single Dockerfile for different environments.
# TARGET_ENV is used to help us distinguish between different environments like
# local, development, testing, staging, production. By default, TARGET_ENV is
# set to local below. To build with other environments use the docker command:
# `docker build --build-arg TARGET_ENV=production`
ARG TARGET_ENV=local
ENV TARGET_ENV=$TARGET_ENV

# which python version to install
ENV PYTHON_VERSION=3.9

RUN apt update --yes && \
apt install --yes software-properties-common && \
\
# for postgres to use
apt install --yes libpq-dev python${PYTHON_VERSION}-dev && \
\
# need to update ubuntu repository targets
sed -i -e 's|eoan|focal|g' /etc/apt/sources.list && \
apt update --yes && \
add-apt-repository ppa:deadsnakes/ppa && \
\
# install python3.9 and remove the symlink for python3.8
# and create a symlink for python3.9 instead
apt install --yes python${PYTHON_VERSION} && \
apt install --yes python3-pip && \
rm /usr/bin/python3 && \
ln -s /usr/bin/python${PYTHON_VERSION} /usr/bin/python3 && \
\
# Copy build-relevant files/folders
mkdir /turbocommerce_backend
ENV HOME=/turbocommerce_backend
COPY ./src $HOME/src
COPY ./.env.${TARGET_ENV} $HOME


WORKDIR $HOME/src
RUN pip3 install --no-cache-dir poetry && \
poetry config virtualenvs.create false && \
poetry install --no-interaction --no-ansi && \
chmod +x $HOME
