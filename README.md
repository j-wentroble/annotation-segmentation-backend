
# Yembo Segmentation System

This project is a backend system for storing and retrieving segmentation masks for an AI annotation tool. It provides REST APIs to manage data annotation projects, store segmentation masks, and retrieve and rank annotations based on their area. This system is designed using Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)

---

## Features

- Save segmentation annotations with metadata.
- Retrieve annotations by ID, label, or annotator.
- Rank annotations by area within a project.
- Easily extendable and scalable architecture.

---

## Tech Stack

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for API routing.
- **MongoDB**: Database for storing annotation data.
- **Mongoose**: ODM for MongoDB.

---

## Data Model

### Annotation Schema

| Field       | Data Type       | Description                                      |
|-------------|-----------------|--------------------------------------------------|
| projectId   | String          | Unique ID of the project.                       |
| annotator   | String          | Name or ID of the annotator.                    |
| label       | String          | Label for the annotation.                       |
| mask        | 2D Array [][Number] | 2D array representing the segmentation mask. |
| area        | Number          | Calculated area of the mask.                    |
| createdAt   | Date            | Timestamp of when the annotation was created.   |

---

## API Endpoints

### 1. Save an Annotation
- **Route**: `POST /annotations`
- **Description**: Create a new annotation.
- **Request Body**:
  ```json
  {
    "projectId": "string",
    "annotator": "string",
    "label": "string",
    "mask": [[0,1,0],[1,1,0]],
    "area": 4
  }
  ```
- **Response**:
  ```json
  {
    "message": "Annotation saved successfully",
    "annotationId": "uniqueId"
  }
  ```

### 2. Retrieve an Annotation
- **Route**: `GET /annotations`
- **Description**: Retrieve an annotation by ID, label, or annotator.
- **Query Parameters**:
  - `id` (optional)
  - `label` (optional)
  - `annotator` (optional)
- **Response**:
  ```json
  [
    {
      "id": "string",
      "projectId": "string",
      "annotator": "string",
      "label": "string",
      "mask": [[0,1,0],[1,1,0]],
      "area": 4,
      "createdAt": "2025-01-19T00:00:00Z"
    }
  ]
  ```

### 3. Query Relative Rank of Annotations
- **Route**: `GET /annotations/rank`
- **Description**: Retrieve annotations ranked by area within a project.
- **Query Parameters**:
  - `projectId` (required)
- **Response**:
  ```json
  [
    {
      "id": "string",
      "label": "string",
      "area": 300,
      "rank": 1
    },
    {
      "id": "string",
      "label": "string",
      "area": 200,
      "rank": 2
    }
  ]
  ```

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v14 or later)
- MongoDB (running locally or via cloud service like MongoDB Atlas)
- npm (Node Package Manager)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/j-wentroble/annotation-segmentation-backend.git
   cd annotation-segmentation-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for MongoDB configuration:
   ```
   MONGO_URI=mongodb://localhost:27017/
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The server will run on `http://localhost:5000`.

---

## Testing

You can test the APIs using tools like **Postman** or **curl**.

### Example Requests

#### Save an Annotation:
```bash
curl -X POST http://localhost:5000/annotations      -H "Content-Type: application/json"      -d '{"projectId":"proj1","annotator":"John","label":"Mask1","mask":[[0,1],[1,0]],"area":10}'
```

#### Retrieve Annotations:
```bash
curl -X GET "http://localhost:5000/annotations?label=Mask1"
```

#### Get Ranked Annotations:
```bash
curl -X GET "http://localhost:5000/annotations/rank?projectId=proj1"
```

---