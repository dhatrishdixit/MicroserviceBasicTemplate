# base image 

FROM node:26-alpine 

# copy and take changes from package.json

WORKDIR /app

COPY ./package.json ./
RUN npm install 
COPY ./ ./ 

CMD ["npm","test"]
