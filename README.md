# ChatSpace

ChatSpace is a real-time chat application built with Django and Channels. It allows users to create, join, and communicate in chat rooms, and features a collaborative document editor for real-time co-working.

## How It Works

The application leverages the Django framework for its backend structure, user management, and request handling.

*   **User Authentication**: The `accounts` app manages user registration and login. It uses Django's built-in authentication system.
*   **Real-time Communication**: The core real-time functionality is powered by Django Channels, which extends Django to handle WebSockets. When a user joins a room, a WebSocket connection is established. The `ChatConsumer` in the `chat` app manages these connections, broadcasting messages sent by one user to all other users in the same room instantly.
*   **Message Persistence (Cassandra)**: Chat messages are persisted to **Cassandra** via `chat/cassandra_model.py` (`ChatMessage`). When a room is opened, the server queries Cassandra for recent messages (e.g., last 50) so users see older history on load.
*   **Audit Events (Cassandra)**: Room join/leave style events are modeled in Cassandra as `ChatRoom` (intended for lightweight audit logs).
*   **Collaborative Editor**: Within each chat room, a shared text area (`colabspace`) allows for real-time document editing. Any changes made by one user are immediately broadcast to and reflected for all other participants in the room via the WebSocket connection.
*   **Room Management**: Authenticated users can create new chat rooms from the home page. The application ensures that each room has a unique address. Users can then join existing rooms to start chatting and collaborating.

## Technology Stack & Dependencies

*   **Backend**:
    *   **Python**
    *   **Django**
    *   **Django Channels**
    *   **Daphne** (ASGI server)
*   **Frontend**:
    *   **HTML5**, **CSS3**, **JavaScript**
*   **Databases**:
    *   **SQLite 3** (commonly used for Django auth/core models in development)
    *   **Apache Cassandra** (used for chat messages and related room event logs)

## Cassandra Notes / Setup

* Cassandra must be reachable at `127.0.0.1:9042` (default).
* On app startup, `chat.apps.ChatConfig.ready()` attempts to:
  * create the keyspace `chatspace_ks` (if missing)
  * sync Cassandra tables for `ChatMessage` and `ChatRoom`
* If Cassandra is not running, you’ll see a startup log like:
  * `Make sure Cassandra is running on 127.0.0.1:9042`

## Project Structure

*   `chatspace/`: The main Django project directory containing settings, root URL configuration, and the ASGI entry point.
*   `accounts/`: The Django app for handling user registration and login.
*   `chat/`: The Django app for the core chat functionality.
    *   `consumer.py`: Manages WebSocket connections and real-time message broadcasting; persists messages to Cassandra.
    *   `views.py`: Handles standard HTTP requests for creating and joining rooms; fetches recent message history from Cassandra when entering a room.
    *   `cassandra_model.py`: Cassandra models (`ChatMessage`, `ChatRoom`) and keyspace configuration.
    *   `routing.py`: Defines the URL routing for WebSocket connections.
*   `templates/`: Contains all HTML templates for the project.
*   `static/`: Contains all static files (CSS, JavaScript).
