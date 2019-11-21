FROM ubuntu:18.04

ENV ORACLE_HOME=/opt/oracle/instantclient
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME
ENV OCI_HOME=/opt/oracle/instantclient
ENV OCI_LIB_DIR=/opt/oracle/instantclient
ENV OCI_INCLUDE_DIR=/opt/oracle/instantclient/sdk/include

RUN apt-get update && \
  apt-get install -y --no-install-recommends software-properties-common && \
  add-apt-repository ppa:jonathonf/python-3.6 && \
  apt-get update -y  && \
  # install all dependencies
  apt-get install -y --no-install-recommends \
  build-essential python3.6 python3.6-dev python3-pip \
  unzip \
  libaio-dev && \
  # remove temp files
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir -p /opt/data/api && \
  # update pip
  python3.6 -m pip install pip --upgrade && \
  python3.6 -m pip install wheel && \
  # create python link
  ln -s /usr/bin/python3 /usr/bin/python

COPY ./oracle-instantclient/ /opt/data
COPY ./install-instantclient.sh /opt/data
COPY ./requirements.txt /opt/data
COPY ./api/server.py /opt/data/api

WORKDIR /opt/data

# INSTALL INSTANTCLIENT AND DEPENDENCIES
RUN ./install-instantclient.sh \
    && pip install -r requirements.txt

EXPOSE 5000

CMD ["python","/opt/data/api/server.py"]
