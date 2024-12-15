# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY PokeTactician-Backend.Server/*.csproj ./PokeTactician-Backend.Server/
COPY poketactician-backend.client/*.esproj ./poketactician-backend.client/
RUN dotnet restore "./PokeTactician-Backend.Server/PokeTactician-Backend.Server.csproj"
COPY . .
WORKDIR "/src/PokeTactician-Backend.Server"
RUN dotnet build "./PokeTactician-Backend.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PokeTactician-Backend.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app

USER root

# Install Julia for ARM64
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://julialang-s3.julialang.org/bin/linux/aarch64/1.9/julia-1.9.3-linux-aarch64.tar.gz && \
    tar -xvzf julia-1.9.3-linux-aarch64.tar.gz && \
    mv julia-1.9.3 /opt/julia && \
    ln -s /opt/julia/bin/julia /usr/local/bin/julia && \
    rm julia-1.9.3-linux-aarch64.tar.gz

USER $APP_UID

# Add your Julia scripts to the container
COPY PokeTactician-Backend.Server/Scripts/ /app/Scripts/

# Install Julia packages
# TODO Replace package installation with a Manifest.toml file
# https://pkgdocs.julialang.org/v1/
RUN julia -e 'using Pkg; Pkg.add("JSON")'

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PokeTactician-Backend.Server.dll"]

