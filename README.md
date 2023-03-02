# course-project-option-ii-TonyRays
course-project-option-ii-TonyRays created by GitHub Classroom

Steps:
1. 
windows:
docker run -it --rm -v %cd%:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true tonyrays/dockerhub:projectimagepush

Linux:
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true tonyrays/dockerhub:projectimagepush

2. 
Open http://localhost:3001/
