Install Dependencies
npm init -y
npm install express aws-sdk cors
Run Backend
node server.js

AWS S3 has two different CORS editors depending on the console version.

If the editor says "JSON" (new S3 console)

Paste this exactly:

[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
##dockerise the app
After installation succeeds:

nano Dockerfile
docker build -t asif-app .
docker run -d -p 3000:3000 --name asif-app asif-app
Option 1: Push Docker Image to ECR (Recommended for EKS)
1. Create ECR Repository
aws ecr create-repository \
  --repository-name image-upload-app \
  --region ap-south-1
2. Login to ECR
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS \
--password-stdin <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com
3. Tag Docker Image

Check image:

docker images

Tag it:

docker tag image-upload-app:latest \
<ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/image-upload-app:latest
4. Push Image
docker push \
<ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/image-upload-app:latest
5. Connect to EKS
aws eks update-kubeconfig \
--region ap-south-1 \
--name my-eks-cluster

Verify:

kubectl get nodes
6. Create Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: image-upload-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: image-upload-app
  template:
    metadata:
      labels:
        app: image-upload-app
    spec:
      containers:
      - name: image-upload-app
        image: <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/image-upload-app:latest
        ports:
        - containerPort: 3000

Apply:

kubectl apply -f deployment.yaml
7. Expose Service
apiVersion: v1
kind: Service
metadata:
  name: image-upload-service
spec:
  type: LoadBalancer
  selector:
    app: image-upload-app
  ports:
  - port: 80
    targetPort: 3000
kubectl apply -f service.yaml

Get LoadBalancer URL:

kubectl get svc

