FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers.
COPY url-tracker.sln url-tracker.sln
COPY src/url/url.csproj src/url/url.csproj

# Restore package deps
RUN dotnet restore url-tracker.sln

# Copy the app folders over
COPY src/url src/url
WORKDIR /app/src/url
RUN dotnet publish -c Release -o /app/src/out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "url.dll" ]