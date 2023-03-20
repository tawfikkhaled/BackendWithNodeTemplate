# BackendWithNodeTemplate
Template de backend avec node



docker images
microk8s  dashboard-proxy
docker run -p 3010:3010 -p 3443:3443 node-backends 


docker build  . -t node-backends
docker tag node-backends:latest localhost:32000/node-backends:registry
docker push localhost:32000/node-backends:registry
microk8s kubectl delete -f node-backend-deployment.yaml 
microk8s kubectl delete -f node-backend-service.yaml 

microk8s kubectl apply -f node-backend-deployment.yaml 
microk8s kubectl apply -f node-backend-service.yaml 
