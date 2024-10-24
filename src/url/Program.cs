using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.Services;
using dotenv.net;
using dotenv.net.Utilities;
using Polly;

Console.WriteLine("-------PROGRAM FILE-------");

string DOMAIN = Environment.GetEnvironmentVariable("DOMAIN");
string PORT = Environment.GetEnvironmentVariable("NEXT_SERVER_PORT");
string MYSQL_DATABASE = Environment.GetEnvironmentVariable("MYSQL_DATABASE");
string MYSQL_ROOT_PASSWORD = Environment.GetEnvironmentVariable("MYSQL_ROOT_PASSWORD");
string connectionString = null;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// var environmentVariables = Environment.GetEnvironmentVariables();
// foreach (System.Collections.DictionaryEntry entry in environmentVariables)
// {
//     Console.WriteLine($"{entry.Key} = {entry.Value}");
// }

/* Set CORS policy with allowed origins */
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                        var allowedDomains = new []{$"http://next:{PORT}", $"http://localhost:{PORT}", $"http://{DOMAIN}", $"https://{DOMAIN}", $"http://*.{DOMAIN}"};

                        policy
                            .SetIsOriginAllowedToAllowWildcardSubdomains()
                            .WithOrigins(allowedDomains)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                            // .AllowAnyOrigin();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHealthChecks();
builder.Services.AddDbContext<UrlDbContext>(opt =>
{
    opt.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"), 
        mysqlOptions =>
        {
            mysqlOptions.EnableRetryOnFailure(); // Enable transient error resiliency
        });
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<TrackingService>();
builder.Services.AddSingleton<ConnectionDebug>();

var app = builder.Build();

// app.UseHttpsRedirection();



app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

// add health check endpoint for k8s readiness probe
app.MapHealthChecks("/healthz");

// Get an instance of ConnectionDebug
var connectionDebug = app.Services.GetRequiredService<ConnectionDebug>();
// Call the LogConnectionString method
connectionDebug.LogConnectionString();

var retryPolicy = Policy
    .Handle<DbUpdateException>().Or<Exception>()
    .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(10));

retryPolicy.ExecuteAndCapture(() => {
    try
    {
        // Console.WriteLine("TRYING INITDB...");
        DbInitializer.InitDb(app);
    }
    catch (Exception e) { Console.WriteLine($"INITDB EXCEPTION: {e}"); }
});

app.Run();