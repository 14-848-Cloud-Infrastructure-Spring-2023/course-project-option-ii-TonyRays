Steps: 

1. 
windows: docker run -it --rm -v %cd%:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true tonyrays/dockerhub:projectimagepush

Linux: docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true tonyrays/dockerhub:projectimagepush

2.
Open http://localhost:3001/


(Checkpoint) Note: for now I used data from https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10
