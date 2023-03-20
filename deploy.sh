docker build  . -t node-backends
docker tag node-backends:latest localhost:32000/node-backends:registry
docker push localhost:32000/node-backends:registry
microk8s kubectl delete -f node-backend-deployment.yaml 
microk8s kubectl delete -f node-backend-service.yaml 

microk8s kubectl apply -f node-backend-deployment.yaml 
microk8s kubectl apply -f node-backend-service.yaml 
