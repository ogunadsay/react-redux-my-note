#Build
FROM microsoft/dotnet:2.1-sdk AS build-env
COPY MyNote /app
WORKDIR /app
RUN ["dotnet", "restore"]
RUN set -ex; \
	if ! command -v gpg > /dev/null; then \
		apt-get update; \
		apt-get install -y --no-install-recommends \
			gnupg2 \
			dirmngr \
		; \
		rm -rf /var/lib/apt/lists/*; \
	fi && curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get update && apt-get install -y build-essential nodejs

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out MyNote.sln

##Runtime 
#FROM microsoft/aspnetcore:2.0.0
#
#WORKDIR /app
#COPY --from=build-env /app/MyNote.Web/out ./
ENTRYPOINT ["dotnet", "MyNote.dll"]