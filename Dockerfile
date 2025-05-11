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

COPY pyproject.toml /app/
COPY uv.lock /app/

# Install Python 3.12 with available packages
RUN apt-get update && \
    apt-get install -y ca-certificates gnupg wget git

    # Download the latest installer
ADD https://astral.sh/uv/install.sh /uv-installer.sh

# Run the installer then remove it
RUN sh /uv-installer.sh && rm /uv-installer.sh && \
    mv /root/.local/bin/uv /usr/local/bin/uv && \
    chmod +x /usr/local/bin/uv

# Create a directory for the virtual environment that all users can access

USER $APP_UID

RUN uv python install 3.12 && \
    uv venv


ENV PATH="/app/.venv/bin:$PATH"

# Install Python packages
RUN uv sync

# Add your Julia scripts to the container
COPY PokeTactician.Server/Scripts/ /app/Scripts/

# Install Julia packages
# TODO Replace package installation with a Manifest.toml file
# https://pkgdocs.julialang.org/v1/
# RUN julia -e 'using Pkg; Pkg.add("JSON")'

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PokeTactician.Server.dll"]

