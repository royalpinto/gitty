FROM node:4.6.0


# Add an user.
RUN adduser --disabled-password --gecos '' gitty


# Copy source code.
ADD . /home/gitty/gitty/

# Copied code belongs to root, change owner as gitty.
RUN chown gitty:gitty -R /home/gitty/

# Switch user
USER gitty

# Clean temporary/untracked files.
RUN cd /home/gitty/gitty/ && git clean -fdx


# Install dependencies.
RUN cd /home/gitty/gitty/ && npm install --production

RUN cd /home/gitty/gitty/ && wget -c 'http://data.githubarchive.org/2015-01-01-15.json.gz'

RUN cd /home/gitty/gitty/ && gzip -dv 2015-01-01-15.json.gz

# Setup workign directory.
WORKDIR /home/gitty/gitty/
