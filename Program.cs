using Microsoft.EntityFrameworkCore;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.Mappings;
using PokeTactician_Backend.Services;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

var connectionString = (builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty)
    .Replace("__DB_HOST__", Environment.GetEnvironmentVariable("DB_HOST"))
    .Replace("__DB_NAME__", Environment.GetEnvironmentVariable("DB_NAME"))
    .Replace("__DB_USER__", Environment.GetEnvironmentVariable("DB_USER"))
    .Replace("__DB_PASSWORD__", Environment.GetEnvironmentVariable("DB_PASSWORD"));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile));
var useInMemoryDatabase = Environment.GetEnvironmentVariable("USE_IN_MEMORY_DATABASE") == "True";

if (useInMemoryDatabase)
{
    builder.Services.AddDbContext<PokemonContext>(opt =>
        opt.UseInMemoryDatabase("InMemoryDb"));
}
else
{
    builder.Services.AddDbContext<PokemonContext>(opt =>
        opt.UseNpgsql(connectionString));
    builder.Services.AddHostedService<DatabaseCleanupService>();
}

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Clean database on startup
builder.Services.AddHostedService<DataInitializationService>();


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

var app = builder.Build();


var logger = app.Services.GetRequiredService<ILogger<Program>>();
if (useInMemoryDatabase)
{
    logger.LogInformation("Using InMemory Database");
}
else
{
    logger.LogInformation("Using PostgreSQL Database");
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();