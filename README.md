Sports Trade Screen
A simulated trading interface for sports-based assets, built with React and Vite. This UI mimics real-time order flow, allows users to place buy/sell trades, and visually displays order history and price trends.

Setup Instructions
1. Clone the Repository
git clone https://github.com/kavyachirukuri/sports-trade-screen.git
cd sports-trade-screen

Architecture Overview:
Tech Stack
Frontend: React 19 with Vite
Styling: CSS Modules
State Management: useState, useEffect (React Hooks)
Deployment: GitHub Pages (via gh-pages branch)

Folder Structure:

<img width="345" height="257" alt="image" src="https://github.com/user-attachments/assets/8c24d48d-2e9b-439d-a989-5f480208b0cf" />


Mock Data Simulation:
To simulate real-time trading:
Price ticks are updated using setInterval every few seconds.
Order book data is randomly generated and stored in localStorage for persistence.
Order fill animations mimic partial fills by toggling fill status with delays.
This allows for a realistic trading feel without a backend.

Key Implementation Decisions:
Vite + React 19: Chosen for fast build and development speed.
LocalStorage: Used for persisting placed trades without a backend.
Animation via CSS + setTimeout: To simulate live order fills smoothly.
Modular design: Each feature is isolated as a component (e.g., TradePanel, OrderRow) for scalability and clarity.

Author
Kavya Chirukuri
https://github.com/kavyachirukuri
