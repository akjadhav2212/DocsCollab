## To run locally using docker
Run this command
1. docker build -t docscollab .
2. docker run -d -e PORT=8000 -p 8001:8000 docscollab"
## OR
Run 
1. docker run -d -e PORT=8000 -p 8001:8000 akjadhav2212/docscollab