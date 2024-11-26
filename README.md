# Sereact-Coding-Challenge

## Overview

Welcome to the **Frontend Coding Challenge** project. This application showcases a comprehensive set of frontend development skills, including state management, backend communication via JSON-RPC over HTTP and WebSockets, styling with Tailwind CSS, and 3D rendering with Three.js. The project evolves through multiple branches, each implementing specific features as per the challenge instructions.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Branch Structure](#branch-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Implementation Details](#implementation-details)
  - [1. Counter App with React and Redux](#1-counter-app-with-react-and-redux)
  - [2. Backend Integration via JSON-RPC over HTTP](#2-backend-integration-via-json-rpc-over-http)
  - [3. Transition from HTTP to WebSockets](#3-transition-from-http-to-websockets)
  - [4. 3D Sphere Rendering with Three.js](#4-3d-sphere-rendering-with-threejs)
  - [5. Managing Sphere Radius via JSON-RPC API](#5-managing-sphere-radius-via-json-rpc-api)
- [Thought Process](#thought-process)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

---

## Project Overview

This project is a multifaceted frontend application built with React, Tailwind CSS, and Three.js, designed to demonstrate a range of frontend development capabilities. The application includes:

- **Counter Functionality**: Implements a versatile counter with increment, decrement, reset, set amount, increase by, and decrease by functionalities.
- **Backend Communication**: Connects to a Node.js backend using JSON-RPC protocol over both HTTP and WebSockets.
- **Styling**: Utilizes Tailwind CSS for responsive and modern styling.
- **3D Graphics**: Renders a 3D sphere using Three.js, with dynamic radius adjustments via the backend API.

The project is structured with separate branches representing each stage of development, allowing for clear progression and review of each feature implementation.

---

## Features

1. **Counter App with React and Redux**
   - Implements a simple counter with increment, decrement, and reset functionalities.
      - Increment: Increase the count by 1.
      - Decrement: Decrease the count by 1.
      - Reset: Reset the count to zero.
      - Set Amount: Set the count to a specific value.
      - Increase By: Increase the count by a user-specified number.
      - Decrease By: Decrease the count by a user-specified number.
   - State management handled through Redux for predictable state transitions.

2. **Backend Integration via JSON-RPC over HTTP**
   - Connects to a Node.js backend using JSON-RPC protocol over HTTP.
   - Performs counter operations by sending JSON-RPC requests to the server.

3. **Transition from HTTP to WebSockets**
   - Replaces HTTP transport with WebSockets for real-time communication.
   - Maintains JSON-RPC protocol over WebSockets for consistent API interaction.

4. **Styling with Tailwind CSS**
   - Utilizes Tailwind CSS for responsive and utility-first styling from the initial implementation.
   - Ensures a clean and modern user interface throughout all features.

5. **3D Sphere Rendering with Three.js**
   - Renders a 3D sphere within the application using Three.js.
   - Provides a visually engaging element to demonstrate 3D graphics integration.

6. **Managing Sphere Radius via JSON-RPC API**
   - Implements `set_radius` and `get_radius` JSON-RPC methods on the backend.
   - Allows dynamic adjustment of the sphere's radius through API calls.

---

## Branch Structure

The project utilizes a branch-based workflow to manage the progressive implementation of features. Each branch corresponds to a specific feature as outlined in the challenge instructions.

- **`main`**: Contains the latest implementation, encompassing all features up to setting and getting the sphere's radius via JSON-RPC over WebSockets without Redux.
- **`counter-app-with-redux`**: Initial implementation of the counter app using React and Redux, with Tailwind CSS styling integrated from the start.
- **`json-rpc-api-over-http`**: Integration of JSON-RPC over HTTP for backend communication. *Note: Redux was removed in this branch.*
- **`plain-websockets`**: Transition from HTTP to WebSockets for real-time communication.
- **`three-js`**: Integration of Three.js to render a 3D sphere.
- **`three-js-with-json-rpc-api`**: Implementation of `set_radius` and `get_radius` API methods to manage the sphere's radius.

> **Note**: The `counter-app-with-redux` branch includes Tailwind CSS from the outset, eliminating the need for a separate branch dedicated to styling. 

> **Note**: The `counter-app-with-redux` branch initially included Redux for state management. However, in subsequent branches, Redux was removed in favor of managing state directly through the backend via JSON-RPC over WebSockets. The `main` branch reflects this latest state without Redux.

---

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- **pnpm** (v6 or later) *(Preferred package manager)*
- **Git**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ramishdev/Sereact-Coding-Challenge.git
   cd Sereact-Coding-Challenge
   ```

2. **Install Dependencies**

   Navigate to both the server and client directories to install necessary packages using **pnpm**.

   - **Install pnpm (if not already installed)**

     If you don't have pnpm installed globally, you can install it using npm:

     ```bash
     npm install -g pnpm
     ```

   - **Server**

     ```bash
     cd server
     pnpm install
     ```

   - **Client**

     ```bash
     cd ../client
     pnpm install
     ```

---

## Usage

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd server
   pnpm start
   ```

   The server will start on `http://localhost:4000` by default.

2. **Start the Frontend Client**

   Open a new terminal window/tab and navigate to the client directory:

   ```bash
   cd ../client
   pnpm start
   ```

   The React application start on `http://localhost:5173`.

### Application Interaction
- **Counter Functionality**:
   - Increment: Click the + button to increase the count by 1.
   - Decrement: Click the - button to decrease the count by 1.
   - Reset: Click the Reset button to reset the count to zero.
   - Set Amount: Enter a specific number in the input field and click Set Amount to set the count to that value.
   - Increase By: Enter a number in the input field and click Increase Amount to add that value to the current count.
   - Decrease By: Enter a number in the input field and click Decrease Amount to subtract that value from the current count.
- **Set Radius**:
  - Input a positive number in the radius field.
  - Click **Set Radius** to update the sphere's radius on the server.

- **Get Radius**:
  - Click **Get Radius** to retrieve the current radius from the server and update the displayed sphere.

- **3D Sphere**:
  - Observe the 3D sphere rendered by Three.js, which updates its size based on the radius fetched from the server.

---

## Implementation Details

### 1. Counter App with React and Redux

**Objective**: Implement a counter with increment, decrement, and reset functionalities, managed through Redux.

**Approach**:

- **React**: Utilized for building the user interface.
- **Redux**: Employed for state management, ensuring predictable state transitions.

**Key Components**:

- **Counter Component**: Displays the current count and provides buttons for counter manipulation.
- **Redux Store**: Manages the counter state, with actions and reducers handling state transitions.

**Thought Process**:

- **State Management**: Chose Redux Toolkit for its scalability and ability to manage complex state interactions.
- **Predictability**: Ensured that state changes are predictable and traceable through actions.

### 2. Backend Integration via JSON-RPC over HTTP

**Objective**: Connect the frontend to a Node.js backend using JSON-RPC protocol over HTTP to perform counter operations.

**Approach**:

- **JSON-RPC**: Selected for its simplicity and adherence to a standard remote procedure call protocol.
- **HTTP Communication**: Established initial communication over HTTP for request-response interactions.

**Key Components**:

- **Node.js Server**: Implements JSON-RPC methods (`increment`, `decrement`, `reset`, `setAmount`, `incrementByAmount`, `decrementByAmount`, `getCount`).
- **Frontend API Calls**: Utilizes Axios for sending JSON-RPC requests to the server.

**Thought Process**:

- **Protocol Choice**: JSON-RPC was chosen for its lightweight nature and ease of integration.
- **Scalability**: Structured the API to allow easy addition of new methods.

### 3. Transition from HTTP to WebSockets

**Objective**: Replace HTTP transport with WebSockets to enable real-time, bidirectional communication between the frontend and backend.

**Approach**:

- **WebSocket Integration**: Implemented using the `ws` library on the server and native WebSocket API on the client.
- **Persistent Connection**: Established a persistent connection to facilitate real-time updates.

**Key Components**:

- **WebSocket Server**: Handles incoming connections and manages JSON-RPC messages.
- **Frontend WebSocket Client**: Manages the WebSocket connection, sending and receiving JSON-RPC messages.

**Thought Process**:

- **Real-Time Communication**: WebSockets provide a more efficient and real-time communication channel compared to HTTP.
- **Complexity Management**: Simplified the transition by maintaining JSON-RPC over WebSockets.

### 4. 3D Sphere Rendering with Three.js

**Objective**: Integrate Three.js to render a 3D sphere within the React application.

**Approach**:

- **Three.js Setup**: Created a separate `ThreeSphere` component to encapsulate the Three.js scene.
- **Rendering Pipeline**: Managed the scene, camera, renderer, and animation loop within the component.

**Key Components**:

- **Sphere Geometry and Material**: Defined the sphere's geometry and appearance using Three.js classes.
- **Animation Loop**: Implemented an animation loop to render and rotate the sphere continuously.

**Thought Process**:

- **Component Isolation**: Separated the Three.js logic into its own component for clarity and reusability.
- **Performance Considerations**: Ensured efficient rendering and cleanup to prevent memory leaks.

### 5. Managing Sphere Radius via JSON-RPC API

**Objective**: Allow dynamic adjustment of the sphere's radius through JSON-RPC API methods (`set_radius` and `get_radius`).

**Approach**:

- **Backend Methods**: Implemented `set_radius` to update the sphere's radius and `get_radius` to retrieve the current radius.
- **Frontend Integration**: Created `SphereControls` component to handle user inputs and API interactions.
- **State Synchronization**: Managed the sphere's radius state in the frontend to reflect backend updates.

**Key Components**:

- **SphereControls Component**: Provides UI elements for setting and getting the sphere's radius.
- **API Calls**: Utilizes WebSockets to send `set_radius` and `get_radius` requests and handle responses.
- **ThreeSphere Component**: Listens for radius changes and updates the rendered sphere accordingly.

**Thought Process**:

- **User Experience**: Decided to have separate actions for setting and getting the radius to align with instructions.
- **State Management**: Ensured that the frontend state remains in sync with the backend state through explicit API calls.
- **Error Handling**: Implemented comprehensive error handling to manage invalid inputs and connection issues.

---

## Thought Process

Throughout the development of this application, the primary focus was on adhering closely to the provided instructions while ensuring a clean, maintainable, and scalable codebase. Here's an overview of the key considerations and decisions made:

1. **Modular Architecture**: Separated concerns by creating distinct components for different functionalities (e.g., `ThreeSphere` for 3D rendering and `SphereControls` for radius management).

2. **State Management Evolution**:
   - **Initial Implementation**: Utilized Redux for predictable and centralized state management in the counter app.
   - **Refactoring**: As the project evolved to incorporate backend communication via JSON-RPC, Redux was deemed redundant. State management transitioned to being handled directly through backend API interactions, simplifying the architecture and reducing complexity.

3. **API Communication Protocols**: Initially started with JSON-RPC over HTTP for simplicity, then transitioned to WebSockets to enable real-time communication, enhancing the application's responsiveness.

4. **3D Graphics with Three.js**: Integrated Three.js to add a visually engaging element, demonstrating the ability to handle complex graphics within a React application.

5. **Dynamic Interaction via JSON-RPC**: Implemented `set_radius` and `get_radius` methods to allow dynamic interaction with the 3D sphere, showcasing the ability to bridge frontend and backend functionalities seamlessly.

6. **Comprehensive Error Handling**: Ensured robust error handling across all components to provide a smooth user experience and prevent application crashes.

7. **Responsive Design**: Focused on making the application responsive to various screen sizes, ensuring accessibility and usability across devices.

8. **Documentation and Comments**: Maintained ample comments and documentation within the code to aid reviewers in understanding the implementation details and thought processes.

---

## Technologies Used

- **Frontend**:
  - **React.js**: Library for building user interfaces.
  - **WebSockets**: Enables real-time, bidirectional communication.
  - **Tailwind CSS**: Utility-first CSS framework.
  - **Three.js**: JavaScript library for 3D graphics.

- **Backend**:
  - **Node.js**: JavaScript runtime environment.
  - **ws**: WebSocket library for Node.js.

- **Communication Protocol**:
  - **JSON-RPC**: Remote procedure call protocol encoded in JSON.

- **Build Tools**:
  - **vite**: Provides a fast development experience with hot module replacement.
  - **pnpm**: Fast, disk space-efficient package manager.

---

## Contact

For any questions or feedback, please contact [rhmi1243@gmail.com](mailto:rhmi1243@gmail.com).

---