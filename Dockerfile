FROM ubuntu:20.04

RUN apt-get update && \
      DEBIAN_FRONTEND=noninteractive apt-get install -y \
        build-essential \
        python3-dev \
        libavcodec-dev \
        libavformat-dev \
        libswresample-dev \
        libavutil-dev \
        python3-acoustid \
        python3-mutagen \
        python3-numpy \
        python3-sqlalchemy \
        python3-setuptools \
        libboost-python-dev \
        python3-flask \
        python3-dbus

COPY . /app

RUN cd /app && \
      BOOST_PYTHON_LIB=boost_python38 python3 setup.py build && \
      python3 setup.py install && \
      rm -rf /app

ENTRYPOINT ["bard_docker.sh"]
CMD ["web"]
