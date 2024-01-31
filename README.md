# Birkbeck, University of London - Cloud Computing Coursework

# Piazza: Cloud Software as a Service

## Overview
Welcome to Piazza, a cloud-based Software as a Service (SaaS) designed to replicate the functionality of a Twitter-like system. In this README, you'll find comprehensive instructions on how to set up, deploy, and utilize Piazza for your social networking needs.

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation and Deployment](#installation-and-deployment)
4. [Functionality](#functionality)
5. [Authentication and Verification](#authentication-and-verification)
6. [Development of Piazza RESTful APIs](#development-of-piazza-restful-apis)
7. [Coursework Phases](#coursework-phases)
   - [Phase A: Install and Deploy](#phase-a-install-and-deploy)
   - [Phase B: Authentication](#phase-b-authentication)
   - [Phase C: Development of Piazza APIs](#phase-c-development-of-piazza-apis)
8. [Support](#support)
9. [Contributing](#contributing)

## Introduction
Piazza is a RESTful SaaS platform where users can post messages, interact with other posts, and browse content based on specific topics. This project aims to demonstrate proficiency in software development methodologies and frameworks by implementing Piazza using virtualized environments such as VMs, containers, and Kubernetes.

## Prerequisites
Before proceeding, ensure you have the following prerequisites installed:
- Node.js
- MongoDB
- Docker (optional, for containerization)
- Kubernetes (optional, for Kubernetes deployment)

## Installation and Deployment
To install and deploy Piazza, follow these steps:
1. Clone this repository to your local machine.
2. Install Node.js dependencies by running `npm install express nodemon mongoose@6.10.0 dotenv body-parser joi bcryptjs jsonwebtoken`.
3. Set up MongoDB and ensure it's running.
4. Start the application by running `npm start`.
5. Access the application at `http://localhost:3000`.

For containerized deployment:
1. Build the Docker image using `docker build -t piazza .`.
2. Run the Docker container with `docker run -d -p 3000:3000 piazza`.

For Kubernetes deployment:
1. Apply the Kubernetes manifests using `kubectl apply -f kubernetes/`.

## Functionality
Piazza supports the following actions:
1. Authorised users access the API using OAuth v2 protocol.
2. Users can post messages for specific topics.
3. Registered users can browse messages per topic.
4. Users can like, dislike, or comment on posts.
5. Users can browse the most active posts per topic.
6. Users can access the history data of expired posts per topic.

## Authentication and Verification
Piazza enforces authentication and verification functionalities using JWT and Node.js:
- User management and JWT functionality are implemented.
- JWT authorizes users to perform actions and store data in the database.
- Unauthorised users are restricted from accessing resources.
- User input undergoes a verification process for validation purposes.

## Development of Piazza RESTful APIs
Piazza's APIs allow basic functionalities and include the following data for posts and interactions:
- Post identifier, title, topic, timestamp, message body, expiration time, status, post owner, likes, dislikes, comments.
- User interaction data includes user information, interaction value, time left for post expiration.

## Coursework Phases
### Phase A: Install and Deploy
- Install necessary packages in the virtual machine.
- Deploy code in the VM using GitHub repository.
- API endpoints should be available under VM IP address.
- Provide a short setup description in the report.

### Phase B: Authentication
- Implement user management and JWT functionality.
- Authenticate users for all actions.
- Verify user input for validation.

### Phase C: Development of Piazza APIs
- Implement basic functionalities described in the coursework.
- Develop database models and application logic.
- List RESTful API endpoints in the report.
