# base image
# images https://hub.docker.com/_/node/
FROM node:14.2.0 AS compile-image
LABEL author="Luis Raul Espinoza Barboza"
EXPOSE 8081
WORKDIR /usr/src/app

RUN adduser www-data sudo
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers


# Create a non-root user
# RUN useradd -r -u 1001 -g root nonroot
# RUN chown -R nonroot /usr/src/app
# USER nonroot

# enviroment variables
# add `/app/node_modules/.bin` to $PATH
ENV PATH="/usr/src/app/node_modules/.bin:$PATH"

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm i

#RUN npm i -g @angular/cli@8.3.26

# copy all file (use dockerignore)
COPY . .
RUN ng build --prod





# nginx image base
#FROM nginx:alpine
FROM nginx:latest
# Create the home directory for the new app user.
#RUN mkdir -p /usr/src/app
# Create an app user so our program doesn't run as root.
# RUN groupadd -r app &&\
#     useradd -r -g app -d /usr/share/nginx/html/ -s /sbin/nologin -c "Docker image user" app
# ENV HOME=/usr/src/app
# ENV APP_HOME=/usr/src/app/dist


#FROM bitnami/nginx:latest
######### nginx-unprivileged
#VOLUME "/var/cache/nginx"
######### end nginx-unprivileged

## Copy our default nginx config
COPY --from=compile-image /usr/src/app/nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'compile-image' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=compile-image /usr/src/app/dist/DockerAngular/. /usr/share/nginx/html


RUN cat /etc/nginx/conf.d/default.conf
RUN ls -l /usr/share/nginx/html/

#
# Add the "app" users to the sudoer's group
#
#RUN echo "app       ALL=(ALL)  NOPASSWD:ALL" >> /etc/sudoers
#USER app

#RUN ls -l
RUN chown -R www-data:www-data /usr/share/nginx/html
USER www-data
# USER www-data
#
# Add sudo to command

#CMD ["sudo nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]

# healtcheck
HEALTHCHECK CMD curl --fail http://localhost:8081/ || exit

# non root user
# RUN chown -R app:app /usr/share/nginx/html
# RUN cat "app ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
# USER app


# #RUN ls -l
# RUN chown -R www-data:www-data /usr/share/nginx/html
# USER www-data

# CMD ["nginx", "-g", "daemon off;"]

# # healtcheck
# HEALTHCHECK CMD curl --fail http://localhost:8081/ || exit 1
