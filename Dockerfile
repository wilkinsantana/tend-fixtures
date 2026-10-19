FROM ruby:3.3.6-alpine3.21
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY app.rb .
ENV PORT=4567
EXPOSE 4567
CMD ["ruby", "app.rb"]
