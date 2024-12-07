using Microsoft.EntityFrameworkCore;
using PokeTactician_Backend.Models;
using PokeTactician_Backend.Mappings;
using PokeTactician_Backend.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<PokemonContext>(opt =>
    opt.UseNpgsql(connectionString));

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<DataLoaderService>();
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();