FROM docker.io/library/ruby:3.4-slim

RUN apt-get update && apt-get install -y \
    gcc \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /site

COPY Gemfile Gemfile.lock ./
RUN bundle install

EXPOSE 4000 35729

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload"]
