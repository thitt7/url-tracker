using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.Services;
using dotenv.net;
using dotenv.net.Utilities;
using Polly;

Console.WriteLine("-------PROGRAM FILE-------");

string dockerEnv = Environment.GetEnvironmentVariable("DOCKER_ENV");
string DOMAIN = null;
string PORT = null;
string DB_NAME= null;
string DB_PW = null;
string connectionString = null;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

if (!string.IsNullOrEmpty(dockerEnv))
{ DotEnv.Load(); }
else
{
    DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] {"../../.env"}));
    DB_NAME = EnvReader.GetStringValue("DB_NAME");
    DB_PW = EnvReader.GetStringValue("DB_PW");
    connectionString = $"Server=127.0.0.1;Port=3306;Database={DB_NAME};User=root;Password={DB_PW}";
    builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;
}

try {
    DOMAIN = EnvReader.GetStringValue("DOMAIN");
    PORT = EnvReader.GetStringValue("NEXT_SERVER_PORT");
}
catch (Exception ex) {Console.WriteLine($"ERROR LOADING DOTENV: {ex.Message}");}

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
// builder.Services.AddSingleton<ConnectionDebug>();

var app = builder.Build();

// app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

// // Get an instance of ConnectionDebug
// var connectionDebug = app.Services.GetRequiredService<ConnectionDebug>();
// // Call the LogConnectionString method
// connectionDebug.LogConnectionString();

var retryPolicy = Policy
    .Handle<DbUpdateException>().Or<Exception>()
    .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(10));

retryPolicy.ExecuteAndCapture(() => DbInitializer.InitDb(app));

// try
// {
//     DbInitializer.InitDb(app);
// }
// catch (Exception e)
// {
//     Console.WriteLine(e);
// }

app.Run();
