using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder
            .SetIsOriginAllowed(origin =>
            {
                // Erlaube alle Ursprünge von localhost und 127.0.0.1
                return origin.StartsWith("http://localhost:") || origin.StartsWith("http://127.0.0.1:");
            })
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowLocalhost"); // Verwende die definierte CORS-Richtlinie
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run("http://localhost:8080"); // Hier den Port 8080 setzen