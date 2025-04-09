# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["AppointmentSchedulingApp.Presentation/AppointmentSchedulingApp.Presentation.csproj", "AppointmentSchedulingApp.Presentation/"]
COPY ["AppointmentSchedulingApp.Application/AppointmentSchedulingApp.Application.csproj", "AppointmentSchedulingApp.Application/"]
COPY ["AppointmentSchedulingApp.Application.Tests/AppointmentSchedulingApp.Application.Tests.csproj", "AppointmentSchedulingApp.Application.Tests/"]
COPY ["AppointmentSchedulingApp.Infrastructure/AppointmentSchedulingApp.Infrastructure.csproj", "AppointmentSchedulingApp.Infrastructure/"]
COPY ["AppointmentSchedulingApp.Domain/AppointmentSchedulingApp.Domain.csproj", "AppointmentSchedulingApp.Domain/"]

RUN dotnet restore "AppointmentSchedulingApp.Presentation/AppointmentSchedulingApp.Presentation.csproj"
COPY . .
WORKDIR "/src/AppointmentSchedulingApp.Presentation"
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "AppointmentSchedulingApp.Presentation.dll"]
