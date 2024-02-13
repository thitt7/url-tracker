
using Microsoft.EntityFrameworkCore;
using URLService.Entities;

namespace URLService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app) {
        using var scope = app.Services.CreateScope();

        SeedData(scope.ServiceProvider.GetService<UrlDbContext>());
    }

    private static void SeedData(UrlDbContext context)
    {
        context.Database.Migrate();

        if (context.URLs.Any()) {
            Console.WriteLine("db data exists - no need to seed");
            return;
        }

        var urls = new List<URL>() 
        {
                new URL
                {
                    OriginalURL = "https://example.com/page1",
                    TrackingId = "examplepath1",
                    TrackingURL = "https://yourtrackingurl.com/abc123",
                    CreatedAt = DateTime.UtcNow,
                    VisitLogs = new List<VisitLog>
                    {
                        new VisitLog
                        {
                            CreatedAt = DateTime.UtcNow,
                            UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
                            IPAddress = "192.168.1.1",
                            Continent = "North America",
                            Country = "United States",
                            Region = "California",
                            City = "Los Angeles",
                            ISP = "Comcast",
                            Coordinates = "34.0522° N, 118.2437° W",
                            Org = "Example Organization"
                        },
                        new VisitLog
                        {
                            CreatedAt = DateTime.UtcNow,
                            UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
                            IPAddress = "192.168.1.2",
                            Continent = "Europe",
                            Country = "United Kingdom",
                            Region = "England",
                            City = "London",
                            ISP = "BT",
                            Coordinates = "51.5074° N, 0.1278° W",
                            Org = "Example Organization"
                        }
                    }
                },
                new URL
                {
                    OriginalURL = "https://example.com/page2",
                    TrackingId = "examplepath2",
                    TrackingURL = "https://yourtrackingurl.com/xyz789",
                    CreatedAt = DateTime.UtcNow,
                    VisitLogs = new List<VisitLog>
                    {
                        new VisitLog
                        {
                            CreatedAt = DateTime.UtcNow,
                            UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
                            IPAddress = "192.168.1.3",
                            Continent = "Asia",
                            Country = "Japan",
                            Region = "Tokyo",
                            City = "Tokyo",
                            ISP = "NTT",
                            Coordinates = "35.6895° N, 139.6917° E",
                            Org = "Example Organization"
                        }
                    }
                }
            };

        context.AddRange(urls);

        context.SaveChanges();
    }
}
