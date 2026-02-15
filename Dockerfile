FROM nginx:alpine

LABEL authors="ebrizha"

COPY docker-entrypoint/99-env-config.sh /docker-entrypoint.d/99-env-config.sh
RUN chmod +x /docker-entrypoint.d/99-env-config.sh

COPY build /usr/share/nginx/html

EXPOSE 80