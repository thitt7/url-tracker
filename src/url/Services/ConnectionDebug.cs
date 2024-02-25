using Microsoft.Extensions.Configuration;
using System;

namespace URLService.Services;

public class ConnectionDebug
{
    private readonly IConfiguration _configuration;

    public ConnectionDebug(IConfiguration configuration)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }

    public void LogConnectionString()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        Console.WriteLine($"CONNECTION STRING: {connectionString}");
    }
}
