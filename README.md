Currency Converter
A simple Node.js web application that converts currencies using live exchange rates from Frankfurter. This project demonstrates:

A Node.js application containerized with Podman
Deployment on a local Kubernetes cluster using kind
Exposing the service via kubectl port-forward
Overview
This Currency Converter lets users:

Enter an amount.
Choose a base currency (“From”).
Choose a target currency (“To”) or “ALL” to see all rates.
Receive a converted amount, or a table of conversions if “ALL” is selected.
The application uses the Frankfurter API to fetch live exchange rates, which doesn’t require an API key.

Tech Stack
Node.js (Express) for the web server
Podman for building and pushing container images
kind (Kubernetes in Docker/Podman) for running a local Kubernetes cluster
kubectl for managing and interacting with Kubernetes
Project Structure
perl
Copy
Edit
.
├── app.js                # Main Node.js application
├── package.json          # Node.js dependencies + scripts
├── package-lock.json     # Lockfile for Node.js dependencies
├── Dockerfile / Containerfile (optional name) # Used by Podman to build the container
├── deployment.yaml       # Kubernetes Deployment manifest
└── service.yaml          # Kubernetes Service manifest
Prerequisites
Node.js (for local testing, optional if you only run containers)
Podman (installed and configured on your machine)
kind (installed for local Kubernetes cluster)
kubectl (to apply manifests and manage your cluster)
Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone <repo_url>
cd Currency-Converter
2. Install Dependencies (Optional)
If you want to run directly on your local machine before containerizing:

bash
Copy
Edit
npm install
npm start
Then open http://localhost:3000 in your browser.

Containerization with Podman
3. Build the Container Image
bash
Copy
Edit
podman build -t your-username/currency-converter:v1 .
Note: Replace your-username with your actual registry username if you plan to push the image to Docker Hub or another registry.

4. Test the Container Locally
bash
Copy
Edit
podman run -p 3000:3000 your-username/currency-converter:v1
Open http://localhost:3000 to confirm everything works.

5. Push the Image (Optional)
If you want to pull the image from a remote registry (Docker Hub, Quay.io, etc.), you need to push it:

Log in to your registry:
bash
Copy
Edit
podman login docker.io
Tag and push:
bash
Copy
Edit
podman tag your-username/currency-converter:v1 docker.io/your-username/currency-converter:v1
podman push docker.io/your-username/currency-converter:v1
Running on Kubernetes with kind
6. Create a Local Kubernetes Cluster
bash
Copy
Edit
kind create cluster
This starts a Kubernetes cluster inside Docker or Podman containers.

7. Deploy the Currency Converter
In your project directory:

bash
Copy
Edit
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
Check that your pods and service are running:

bash
Copy
Edit
kubectl get pods
kubectl get service
8. Access the Application
Because this example uses a LoadBalancer or ClusterIP (depending on your YAML), you can port-forward to reach the service locally:

bash
Copy
Edit
kubectl port-forward service/currency-converter-service 8080:80
Then open http://localhost:8080 in your browser.

Alternatively, if you configured a NodePort, you can find the node port via:

bash
Copy
Edit
kubectl get service
and then visit <cluster-ip>:<node-port>.

Troubleshooting
Podman Push Access Denied: Make sure you’ve tagged the image with the correct registry (e.g., docker.io/username/image:tag) and that you’re logged in (podman login docker.io).
LoadBalancer Pending: Local Kubernetes solutions like kind or Minikube don’t automatically provision load balancers. Use NodePort or port-forward if you’re running locally.
No External IP: Same reason as above. Use kubectl port-forward or minikube service <service-name> if on Minikube.
License
This project is licensed under the MIT License - feel free to modify and distribute it as you see fit.

Contributing
Feel free to open an issue or submit a pull request if you have any suggestions or improvements.

Enjoy your Currency Converter on Kubernetes!
