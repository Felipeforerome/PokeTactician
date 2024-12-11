# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the .csproj file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Install Julia for ARM64
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://julialang-s3.julialang.org/bin/linux/aarch64/1.9/julia-1.9.3-linux-aarch64.tar.gz && \
    tar -xvzf julia-1.9.3-linux-aarch64.tar.gz && \
    mv julia-1.9.3 /opt/julia && \
    ln -s /opt/julia/bin/julia /usr/local/bin/julia && \
    rm julia-1.9.3-linux-aarch64.tar.g

COPY --from=build /app/out .

# Add your Julia scripts to the container
COPY Scripts/ /app/Scripts/

# Install Julia packages
# TODO Replace package installation with a Manifest.toml file
# https://pkgdocs.julialang.org/v1/
RUN julia 'using Pkg; Pkg.add("JSON")'

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV DOTNET_ENVIRONMENT=Development

# Expose port 80
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "PokeTactician-Backend.dll"]