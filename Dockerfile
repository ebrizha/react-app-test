FROM nginx:alpine

LABEL authors="ebrizha"

COPY build /usr/share/nginx/html

EXPOSE 80