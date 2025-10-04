# ChatSpace

ChatSpace is a real-time chat application built with Django and Channels. It allows users to create, join, and communicate in chat rooms, and features a collaborative document editor for real-time co-working.

## How It Works

The application leverages the Django framework for its backend structure, user management, and request handling.

*   **User Authentication**: The `accounts` app manages user registration and login. It uses Django's built-in authentication system.
*   **Real-time Communication**: The core real-time functionality is powered by Django Channels, which extends Django to handle WebSockets. When a user joins a room, a WebSocket connection is established. The `ChatConsumer` in the `chat` app manages these connections, broadcasting messages sent by one user to all other users in the same room instantly.
*   **Collaborative Editor**: Within each chat room, a shared text area (`colabspace`) allows for real-time document editing. Any changes made by one user are immediately broadcast to and reflected for all other participants in the room via the WebSocket connection.
*   **Room Management**: Authenticated users can create new chat rooms from the home page. The application ensures that each room has a unique name. Users can then join existing rooms to start chatting and collaborating.

## Technology Stack & Dependencies

*   **Backend**:
    *   **Python**: The core programming language.
    *   **Django**: The web framework used for the main application structure, ORM, and user authentication.
    *   **Django Channels**: Enables WebSocket support for real-time features.
    *   **Daphne**: The ASGI server required to run a Channels-powered application.
*   **Frontend**:
    *   **HTML5**: For structuring the web pages.
    *   **CSS3**: For styling the user interface.
    *   **JavaScript**: For handling client-side logic, WebSocket connections, and DOM manipulation.
*   **Database**:
    *   **SQLite 3**: The default database used for development.

## Project Structure

*   `chatspace/`: The main Django project directory containing settings, root URL configuration, and the ASGI entry point.
*   `accounts/`: The Django app for handling user registration and login.
*   `chat/`: The Django app for the core chat functionality.
    *   `consumer.py`: Manages WebSocket connections and real-time message broadcasting.
    *   `views.py`: Handles standard HTTP requests for creating and joining rooms.
    *   `routing.py`: Defines the URL routing for WebSocket connections.
*   `templates/`: Contains all HTML templates for the project.
*   `static/`: Contains all static files (CSS, JavaScript).
