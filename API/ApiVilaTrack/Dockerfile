# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ApiVilaTrack/ApiVilaTrack.csproj ApiVilaTrack/
RUN dotnet restore "ApiVilaTrack/ApiVilaTrack.csproj"

# Copy everything else and build
COPY ApiVilaTrack/ ApiVilaTrack/
WORKDIR /src/ApiVilaTrack
RUN dotnet build "ApiVilaTrack.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "ApiVilaTrack.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

# Copy published app
COPY --from=publish /app/publish .

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "ApiVilaTrack.dll"]
