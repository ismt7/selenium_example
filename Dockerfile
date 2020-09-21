FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
# export DEBIAN_FRONTEND=noninteractive

COPY src/ /home/

RUN apt-get update && \
    apt-get install -y \
        git \
        curl \
        wget \
        gconf2 \
        gnupg \
        gnupg2 \
        gnupg1 &&\
    curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y \
        nodejs && \
    node -v && \
    sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    apt-get update && \
    apt-get install -y \
        google-chrome-stable