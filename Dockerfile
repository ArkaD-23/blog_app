FROM ubuntu

WORKDIR /app

COPY . /app/

EXPOSE 5000

CMD [ "npm" , "start" ]
