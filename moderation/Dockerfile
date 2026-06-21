# base image 

FROM node:26-alpine 

WORKDIR /app
# copy and take changes from package.json
COPY ./package.json ./
RUN npm install 
COPY ./ ./ 

CMD ["npm","test"]
