
using Microsoft.Extensions.Hosting;

using Microsoft.Extensions.DependencyInjection;

using PokeTactician_Backend.Models;

using Microsoft.EntityFrameworkCore;

using System.Threading;

using System.Threading.Tasks;



public class DatabaseCleanupService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;
    public DatabaseCleanupService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<PokemonContext>();

            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"GamePokemon\"", cancellationToken);
            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"MovePokemon\"", cancellationToken);
            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"Games\"", cancellationToken);
            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"Moves\"", cancellationToken);
            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"Pokemons\"", cancellationToken);
            await context.Database.ExecuteSqlRawAsync("DELETE from public.\"Types\"", cancellationToken);

        }

    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}