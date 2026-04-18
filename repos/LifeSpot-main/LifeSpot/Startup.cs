using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LifeSpot
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services) { }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();
            app.UseStaticFiles(); 

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapSliderImages(); 
                endpoints.MapCss();
                endpoints.MapJs();
                endpoints.MapHtml();
            });
        }
    }
}