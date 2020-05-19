FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
# FROM mcr.microsoft.com/dotnet/core/runtime:3.1
#COPY bin/release/netcoreapp3.0/publish/ app/

#ENTRYPOINT ["dotnet", "app/dockerapp.dll"]

#new

#FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore


# Copy everything else and build
COPY . ./
RUN dotnet publish -c release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "app/dockerapp.dll"]
