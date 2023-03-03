# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install axios
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm install react-router-dom
RUN npm install react-bootstrap
# add app
COPY . ./

# start app
CMD ["npm", "start"]