# To create docker posgre database
docker-compose -f docker-compose.yml up

# To run Backend
cd BE
npm i
node server.js

# To run Frontend

cd FE
yarn
yarn start
