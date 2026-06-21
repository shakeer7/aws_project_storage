# AWS DevOps Capstone Project

## Overview

This project demonstrates an end-to-end DevOps implementation on AWS using Infrastructure as Code, containerization, Kubernetes orchestration, CI/CD automation, and observability.

The application consists of a Node.js backend deployed to Amazon EKS, containerized using Docker, managed through Terraform, and monitored using Datadog.

---

## Architecture

### Technologies Used

* AWS EKS (Elastic Kubernetes Service)
* AWS ECR (Elastic Container Registry)
* Terraform
* Docker
* Kubernetes
* GitHub Actions
* Datadog
* Node.js
* Amazon EC2

---

## Project Structure

```text
project-root/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── modules/
│
├── kubernetes/
│   ├── deployment.yaml
│   └── service.yaml
│
├── .github/
│   └── workflows/
│       ├── terraform-plan.yml
│       ├── terraform-apply.yml
│       └── terraform-destroy.yml
│
└── README.md
```
<img width="1763" height="1755" alt="Screenshot_20-6-2026_162527_us5 datadoghq com" src="https://github.com/user-attachments/assets/70752f72-d723-42f7-84ce-c03f4aa7654e" />

<img width="1763" height="2249" alt="Screenshot_20-6-2026_165047_us5 datadoghq com" src="https://github.com/user-attachments/assets/d48d8642-b1e2-4a4f-97d5-6dc119d6d404" />

<img width="1917" height="1012" alt="Screenshot 2026-06-20 161637" src="https://github.com/user-attachments/assets/59114f0c-ea67-481d-ad09-5cdeeeb12a29" />

---

## Infrastructure Provisioning

Terraform is used to provision:

* VPC
* Public and Private Subnets
* Internet Gateway
* Route Tables
* Security Groups
* EKS Cluster
* EKS Node Group

### Initialize Terraform

```bash
terraform init
```

### Validate Configuration

```bash
terraform validate
```

### Create Execution Plan

```bash
terraform plan
```

### Apply Infrastructure

```bash
terraform apply
```

### Destroy Infrastructure

```bash
terraform destroy
```

---

## Docker Build

Build the application image:

```bash
docker build -t asif-app .
```

Tag the image:

```bash
docker tag asif-app:latest <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/asif-app:latest
```

Push image to ECR:

```bash
docker push <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/asif-app:latest
```

---

## Kubernetes Deployment

Deploy the application:

```bash
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```

Verify resources:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

---

## CI/CD Pipeline

GitHub Actions automates:

* Terraform Validation
* Terraform Plan
* Terraform Apply
* Docker Image Build
* Push to Amazon ECR
* Kubernetes Deployment

### Required GitHub Secrets

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

---

## Monitoring and Observability

Datadog is integrated with Amazon EKS for:

* Kubernetes Monitoring
* Container Monitoring
* Infrastructure Metrics
* Application Logs
* Cluster Health Monitoring

### Datadog Features Enabled

* Cluster Checks
* Orchestrator Explorer
* Container Log Collection

---

## Application Access

Retrieve LoadBalancer endpoint:

```bash
kubectl get svc
```

Access the application using the generated AWS LoadBalancer URL.

---

## Verification Commands

```bash
kubectl get nodes

kubectl get pods -A

kubectl get svc

kubectl get deployments

aws ecr describe-repositories

aws eks update-kubeconfig --region ap-south-1 --name <cluster-name>
```

---

## Future Enhancements

* HTTPS with AWS ACM
* Ingress Controller
* ArgoCD GitOps
* Horizontal Pod Autoscaler
* Prometheus and Grafana Integration
* Blue/Green Deployments

---

## Author

Shakeer Mohammed
AWS DevOps Engineer
