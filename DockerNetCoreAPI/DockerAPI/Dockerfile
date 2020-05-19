#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base

# Create the home directory for the new app user.
# RUN mkdir -p /home/app
# # Create an app user so our program doesn't run as root.
# RUN groupadd -r app &&\
#     useradd -r -g app -d /home/app -s /sbin/nologin -c "Docker image user" app
# # Set the home directory to our app user's home.
# ENV HOME=/app
# ENV APP_HOME=/app/api

WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["DockerAPI.csproj","./"]
RUN dotnet restore "./DockerAPI.csproj"
COPY . .

RUN dotnet build "DockerAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DockerAPI.csproj" -c Release -o /app/publish

FROM base AS final
EXPOSE 8080
ENV ASPNETCORE_URLS http://*:8080

# healtcheck
HEALTHCHECK CMD curl --fail http://localhost:8080/healthcheck || exit 1

WORKDIR /app
COPY --from=publish /app/publish .

# RUN chown -R app:app ${HOME}
# USER app
# RUN chmod 400 *

# not root user
RUN chown -R www-data:www-data /app
USER www-data

ENTRYPOINT ["dotnet", "DockerAPI.dll"]