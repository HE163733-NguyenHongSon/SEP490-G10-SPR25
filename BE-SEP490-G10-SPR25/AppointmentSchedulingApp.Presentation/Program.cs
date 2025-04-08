using AppointmentSchedulingApp.Domain.Entities;
using AppointmentSchedulingApp.Domain.IRepositories;
using AppointmentSchedulingApp.Domain.IUnitOfWork;
using AppointmentSchedulingApp.Infrastructure;
using AppointmentSchedulingApp.Infrastructure.Database;
using AppointmentSchedulingApp.Infrastructure.Repositories;
using AppointmentSchedulingApp.Infrastructure.UnitOfWork;
using AppointmentSchedulingApp.Application.DTOs;
using AppointmentSchedulingApp.Infrastructure.Helper;
using AppointmentSchedulingApp.Application.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OData.ModelBuilder;
using Microsoft.OpenApi.Models;
using System.Text;
using AppointmentSchedulingApp.Application.IServices;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
ODataConventionModelBuilder modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<ReservationDTO>("Reservations");
modelBuilder.EntitySet<MedicalRecordDTO>("MedicalRecords");
modelBuilder.EntitySet<DoctorDTO>("Doctors");
modelBuilder.EntitySet<PatientDTO>("Patients");
modelBuilder.EntitySet<SpecialtyDTO>("Specialties");
modelBuilder.EntitySet<ServiceDTO>("Services");
var provider = builder.Services.BuildServiceProvider();
var config = provider.GetService<IConfiguration>();



builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });   
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: ",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new string[] {}
                    }
                });
});

// JWT
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("JwtAppsettings"));
var secretKey = builder.Configuration["JwtAppsettings:SecretKey"];
var secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    
    // Configure event handlers for JWT authentication
    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            // Log successful token validation
            var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogInformation("Token validated successfully");
            
            // Ensure roles are properly handled from the token
            var userIdClaim = context.Principal.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
            {
                logger.LogInformation($"Authenticated user ID: {userIdClaim.Value}");
            }

            // Log roles for debugging
            var roleClaims = context.Principal.FindAll(ClaimTypes.Role);
            foreach (var roleClaim in roleClaims)
            {
                logger.LogInformation($"User has role: {roleClaim.Value}");
            }

            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogError($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
            logger.LogWarning("Authentication challenge issued");
            return Task.CompletedTask;
        }
    };
    
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidAudience = builder.Configuration["JwtAppsettings:Audience"],
        ValidIssuer = builder.Configuration["JwtAppsettings:Issuer"],
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
        // Use the exact claim type mapping for role claims
        RoleClaimType = ClaimTypes.Role,
        NameClaimType = ClaimTypes.Name,
        ClockSkew = TimeSpan.Zero
    };
});

// Add authorization policies for Vietnamese role names
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Quản trị viên"));
    options.AddPolicy("RequireDoctorRole", policy => policy.RequireRole("Bác sĩ"));
    options.AddPolicy("RequirePatientRole", policy => policy.RequireRole("Bệnh nhân"));
    options.AddPolicy("RequireReceptionistRole", policy => policy.RequireRole("Lễ tân"));
    options.AddPolicy("RequireGuardianRole", policy => policy.RequireRole("Người giám hộ"));
});

builder.Services.AddControllers().AddOData(opt => opt.Select().Filter().SetMaxTop(100).Expand().OrderBy().Count().AddRouteComponents("odata", modelBuilder.GetEdmModel()));



builder.Services.AddDbContext<AppointmentSchedulingDbContext>(options =>
    options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("MyDatabase")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<IReservationService, ReservationService>();

// Đăng ký repository generic
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

// Đăng ký các dịch vụ khác
builder.Services.AddScoped<IMedicalRecordService, MedicalRecordService>();
builder.Services.AddScoped<IMedicalReportService, MedicalReportService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<ISpecialtyService, SpecialtyService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();

// Đăng ký các dịch vụ liên quan đến người dùng
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());//Tự tìm mapper trong phạm vi  solution với các project đã tham chiếu với nhau

//builder.WebHost.UseUrls("http://0.0.0.0:8080"); // Lắng nghe tất cả các địa chỉ IP 


// Add Email Configs
var emailConfig = configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.MapGet("/healthz", () => "Healthy");

// app.UseHttpsRedirection(); // Tạm thời vô hiệu hóa để tránh lỗi HTTPS port
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();