# Dockerfile para Caffenio Backend
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

# Instalar curl para healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Caffenio.API/Caffenio.API.csproj", "Caffenio.API/"]
RUN dotnet restore "Caffenio.API/Caffenio.API.csproj"
COPY Caffenio.API/ Caffenio.API/
WORKDIR "/src/Caffenio.API"
RUN dotnet build "Caffenio.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Caffenio.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Caffenio.API.dll"]
