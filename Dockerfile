#FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
#WORKDIR /app
#EXPOSE 56484
#EXPOSE 44329
#
#FROM microsoft/dotnet:2.1-sdk AS build
#WORKDIR /src
#COPY MyNote/MyNote.csproj MyNote/
#RUN dotnet restore MyNote/MyNote.csproj
#RUN set -ex; \
#	if ! command -v gpg > /dev/null; then \
#		apt-get update; \
#		apt-get install -y --no-install-recommends \
#			gnupg2 \
#			dirmngr \
#		; \
#		rm -rf /var/lib/apt/lists/*; \
#	fi && curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get update && apt-get install -y #build-essential nodejs
#COPY . .
#WORKDIR /src/MyNote
#RUN dotnet build MyNote.csproj -c Release -o /app
#
#WORKDIR /src
#EXPOSE 80/tcp
#
#RUN chmod +x entrypoint.sh
#CMD /bin/bash entrypoint.sh
#
#WORKDIR /src/MyNote
#FROM build AS publish
#RUN dotnet publish MyNote.csproj -c Release -o /app
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app .
##ENTRYPOINT ["dotnet", "MyNote.dll"]
#

FROM microsoft/dotnet
COPY . /app
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
RUN ["dotnet", "build"]
EXPOSE 5000/tcp
EXPOSE 5001/tcp
RUN chmod +x ./entrypoint.sh
RUN sed -i 's/\r$//' ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh