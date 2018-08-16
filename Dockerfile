FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 56484
EXPOSE 44329

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY MyNote/MyNote.csproj MyNote/
RUN dotnet restore MyNote/MyNote.csproj
RUN set -ex; \
	if ! command -v gpg > /dev/null; then \
		apt-get update; \
		apt-get install -y --no-install-recommends \
			gnupg2 \
			dirmngr \
		; \
		rm -rf /var/lib/apt/lists/*; \
	fi && curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get update && apt-get install -y build-essential nodejs
COPY . .
WORKDIR /src/MyNote
RUN dotnet build MyNote.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish MyNote.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MyNote.dll"]