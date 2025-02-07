<div align="center">

  
  # **Currency Converter**
  <em>A modern, lightweight web application for converting currencies, containerized with Podman and deployed on a local Kubernetes cluster using kind.</em>
</div>

---

## ✨ Overview
This **Currency Converter** lets you:

1. **Enter an amount**  
2. **Choose a base currency (“From”)**  
3. **Choose a target currency (“To”)** or select **“ALL”** to see every rate  
4. **Receive a converted amount**, or a **table of conversions** if “ALL” is selected

> **Powered by:** [Frankfurter](https://www.frankfurter.app/) — No API Key Required!

---

## ⚙️ Tech Stack

- **Node.js (Express):** Serves the Currency Converter web app  
- **Podman:** Builds and pushes container images  
- **kind (Kubernetes in Docker/Podman):** Runs a local Kubernetes cluster for development  
- **kubectl:** Manages and interacts with Kubernetes clusters

---

## 🏗 Project Structure

. ├── app.js # Main Node.js application ├── package.json # Node.js dependencies + scripts ├── package-lock.json # Lockfile for Node.js dependencies ├── Dockerfile or Containerfile # Used by Podman to build the container ├── deployment.yaml # Kubernetes Deployment manifest └── service.yaml # Kubernetes Service manifest

yaml
Copy
Edit

---

## 📋 Prerequisites

- **Node.js** (for local testing, optional if you only run containers)
- **Podman** (installed and configured on your system)
- **kind** (for creating a local Kubernetes cluster)
- **kubectl** (for applying manifests and managing clusters)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```
git clone <repo_url>
cd Currency-Converter
```
2️⃣ Install Dependencies (Optional)
If you’d like to run the app locally (not in a container):
```
npm install
npm start
```
Then open http://localhost:3000 in your browser.

🐳 Containerization with Podman
3️⃣ Build the Container Image
```
podman build -t your-username/currency-converter:v1 .
```
Note: Replace your-username with your actual registry username if you plan to push to Docker Hub (or another registry).

4️⃣ Test the Container Locally
```
podman run -p 3000:3000 your-username/currency-converter:v1
```
Visit http://localhost:3000 to ensure everything works.

5️⃣ Push the Image (Optional)
If you want your container pulled from a remote registry:

Log in:
```
podman login docker.io
```
Tag & Push:
```
podman tag your-username/currency-converter:v1 docker.io/your-username/currency-converter:v1
podman push docker.io/your-username/currency-converter:v1
```
☸️ Running on Kubernetes with kind
6️⃣ Create a Local Cluster
```
kind create cluster
```
This spins up a Kubernetes cluster inside Docker or Podman containers.

7️⃣ Deploy the Currency Converter
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
Check that your pods and service are up:

```
kubectl get pods
kubectl get service
```
8️⃣ Access the Application
By default, this example might use a LoadBalancer or ClusterIP. You can port-forward to access it locally:

```
kubectl port-forward service/currency-converter-service 8080:80
```
Then open http://localhost:8080.

Alternatively, if you configured a NodePort, find it via:

```
kubectl get service
```
and visit http://<cluster-ip>:<node-port>.

<br /> <div align="center"> <strong>Happy Currency Converting with Kubernetes! 🚀</strong> </div> 
