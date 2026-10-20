# A build that takes about two and a half minutes on purpose, so a deploy is
# reliably in flight while something else (a Tend update) happens.
FROM alpine:3.21
COPY FIXTURE.md /srv/www/index.html
RUN echo "building slowly" && sleep 150 && echo "done"
EXPOSE 8080
CMD ["busybox", "httpd", "-f", "-p", "8080", "-h", "/srv/www"]
