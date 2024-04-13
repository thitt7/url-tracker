using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.Services;
using dotenv.net;
using dotenv.net.Utilities;
using Polly;

Console.WriteLine("-------PROGRAM FILE UPDATED-------");

string dockerEnv = Environment.GetEnvironmentVariable("DOCKER_ENV");
string DOMAIN = null;
string PORT = null;
string MYSQL_DATABASE= null;
string MYSQL_ROOT_PASSWORD = null;
string connectionString = null;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

if (!string.IsNullOrEmpty(dockerEnv))
{ DotEnv.Load(); }
else
{
    DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] {"../../.env"}));
    MYSQL_DATABASE = EnvReader.GetStringValue("MYSQL_DATABASE");
    MYSQL_ROOT_PASSWORD = EnvReader.GetStringValue("MYSQL_ROOT_PASSWORD");
    connectionString = $"Server=127.0.0.1;Port=3306;Database={MYSQL_DATABASE};User=root;Password={MYSQL_ROOT_PASSWORD}";
    builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;
}

try {
    DOMAIN = EnvReader.GetStringValue("DOMAIN");
    PORT = EnvReader.GetStringValue("NEXT_SERVER_PORT");
}
catch (Exception ex) {Console.WriteLine($"ERROR LOADING DOTENV: {ex.Message}");}

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
                          policy.WithOrigins($"http://next:{PORT}", $"http://localhost:{PORT}", $"https://{DOMAIN}:{PORT}")
                                            .AllowAnyHeader()
                                            .AllowAnyMethod();
                                            // .AllowAnyOrigin();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<UrlDbContext>(opt => {
    opt.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<TrackingService>();
builder.Services.AddSingleton<ConnectionDebug>();

var app = builder.Build();

// app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

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