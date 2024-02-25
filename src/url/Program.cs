using Microsoft.EntityFrameworkCore;
using URLService.Data;
using URLService.Services;

var builder = WebApplication.CreateBuilder(args);

// Console.WriteLine("-------PROGRAM FILE-------");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<UrlDbContext>(opt => {
    opt.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Add TrackingService to the services collection
builder.Services.AddScoped<TrackingService>();
// builder.Services.AddSingleton<ConnectionDebug>();

var app = builder.Build();

// Configure the HTTP request pipeline.

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// // Get an instance of ConnectionDebug
// var connectionDebug = app.Services.GetRequiredService<ConnectionDebug>();
// // Call the LogConnectionString method
// connectionDebug.LogConnectionString();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
