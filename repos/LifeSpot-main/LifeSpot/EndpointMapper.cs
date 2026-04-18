using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.IO;
using System.Text;

namespace LifeSpot
{
    public static class EndpointMapper
    {
        public static void MapCss(this IEndpointRouteBuilder builder)
        {
            builder.MapGet("/Static/CSS/{fileName}", async context =>
            {
                var fileName = context.Request.RouteValues["fileName"]?.ToString();
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", fileName);
                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }
                context.Response.ContentType = "text/css; charset=utf-8";
                await context.Response.WriteAsync(await File.ReadAllTextAsync(path));
            });
        }

        public static void MapJs(this IEndpointRouteBuilder builder)
        {
            builder.MapGet("/Static/JS/{fileName}", async context =>
            {
                var fileName = context.Request.RouteValues["fileName"]?.ToString();
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", fileName);
                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }
                context.Response.ContentType = "application/javascript; charset=utf-8";
                await context.Response.WriteAsync(await File.ReadAllTextAsync(path));
            });
        }
        public static void MapSliderImages(this IEndpointRouteBuilder builder)
        {
            builder.MapGet("/Static/Images/slider/{fileName}", async context =>
            {
                var fileName = context.Request.RouteValues["fileName"]?.ToString();
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Static", "Images", "slider", fileName);

                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }

                var ext = Path.GetExtension(fileName).ToLower();
                context.Response.ContentType = ext switch
                {
                    ".jpg" or ".jpeg" => "image/jpeg",
                    ".png" => "image/png",
                    ".gif" => "image/gif",
                    ".webp" => "image/webp",
                    _ => "application/octet-stream"
                };

                await context.Response.SendFileAsync(path);
            });
        }

        public static void MapHtml(this IEndpointRouteBuilder builder)
        {
       
            string ReadSafe(string path) => File.Exists(path) ? File.ReadAllText(path) : "";

            var footer = ReadSafe(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
            var sidebar = ReadSafe(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sidebar.html"));
            var slider = ReadSafe(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "slider.html"));

            builder.MapGet("/", async context =>
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }
                var html = new StringBuilder(await File.ReadAllTextAsync(path))
                    .Replace("<!--SIDEBAR-->", sidebar)
                    .Replace("<!--FOOTER-->", footer);
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/testing", async context =>
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");
                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }
                var html = new StringBuilder(await File.ReadAllTextAsync(path))
                    .Replace("<!--SIDEBAR-->", sidebar)
                    .Replace("<!--FOOTER-->", footer);
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.WriteAsync(html.ToString());
            });

            builder.MapGet("/about", async context =>
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");
                if (!File.Exists(path)) { context.Response.StatusCode = 404; return; }
                var html = new StringBuilder(await File.ReadAllTextAsync(path))
                    .Replace("<!--SIDEBAR-->", sidebar)
                    .Replace("<!--FOOTER-->", footer)
                    .Replace("<!--SLIDER-->", slider);
                context.Response.ContentType = "text/html; charset=utf-8";
                await context.Response.WriteAsync(html.ToString());
            });
        }
    }
}