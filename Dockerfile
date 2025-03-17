# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY PokeTactician.Server/*.csproj ./PokeTactician.Server/
COPY poketactician.client/*.esproj ./poketactician.client/
RUN dotnet restore "./PokeTactician.Server/PokeTactician.Server.csproj"
COPY . .
WORKDIR "/src/PokeTactician.Server"
RUN dotnet build "./PokeTactician.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PokeTactician.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
ARG PAT
ENV PAT=$PAT

USER root

# Install Julia for ARM64
# RUN apt-get update && \
#     apt-get install -y wget && \
#     wget https://julialang-s3.julialang.org/bin/linux/aarch64/1.9/julia-1.9.3-linux-aarch64.tar.gz && \
#     tar -xvzf julia-1.9.3-linux-aarch64.tar.gz && \
#     mv julia-1.9.3 /opt/julia && \
#     ln -s /opt/julia/bin/julia /usr/local/bin/julia && \
#     rm julia-1.9.3-linux-aarch64.tar.gz

# Install Python 3.12 with available packages
RUN apt-get update && \
    apt-get install -y ca-certificates gnupg wget git && \
    echo "deb http://ppa.launchpadcontent.net/deadsnakes/ppa/ubuntu jammy main" > /etc/apt/sources.list.d/deadsnakes-ppa.list && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys F23C5A6CF475977595C89F51BA6932366A755776 && \
    apt-get update && \
    apt-get install -y python3.12 python3.12-venv python3.12-dev && \
    wget https://bootstrap.pypa.io/get-pip.py && \
    python3.12 get-pip.py && \
    rm get-pip.py && \
    python3.12 -m pip install setuptools


# Install a Python package (example: requests)
RUN python3.12 -m pip install requests git+https://${PAT}@github.com/Felipeforerome/PokeTactician-Engine.git

USER $APP_UID

# Add your Julia scripts to the container
COPY PokeTactician.Server/Scripts/ /app/Scripts/

# Install Julia packages
# TODO Replace package installation with a Manifest.toml file
# https://pkgdocs.julialang.org/v1/
# RUN julia -e 'using Pkg; Pkg.add("JSON")'

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PokeTactician.Server.dll"]

