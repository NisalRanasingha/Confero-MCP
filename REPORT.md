# Technical Assessment Report - Full-Stack Developer Intern

This repository contains a creative, interactive single-page web application that redesigns the reference conference experience. It features an intelligent Python backend powered by a Retrieval-Augmented Generation (RAG) pipeline to seamlessly match attendee professional challenges with the official event agenda.

---

## 1. Live Gateways

* **Live Frontend Website:** [https://event-managment-frontend-nine.vercel.app](https://event-managment-frontend-nine.vercel.app)
* **Running Backend API Endpoint:** [https://event-managment-p7m8.onrender.com](https://event-managment-p7m8.onrender.com)

---

## 2. Local Setup Guide

Follow these step-by-step terminal instructions to clone the repository, install dependencies, and run both the Frontend and Backend services locally.

### Prerequisites
* Node.js (v18 or higher)
* Python (v3.10 or higher)
* An OpenAI / LLM API Key

### Step 1: Clone the Repository
```bash
git clone [https://github.com/NisalRanasingha/Event-Managment.git](https://github.com/NisalRanasingha/Event-Managment.git)
cd Event-Managment
Step 2: Backend Setup (FastAPI)
Navigate to the backend directory:

Bash
cd backend
Create and activate a Python virtual environment:

Bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
Install the required dependencies:

Bash
pip install -r requirements.txt
Create a .env file in the backend root and add your API credentials:

Code snippet
OPENAI_API_KEY=your_actual_api_key_here
Run the development server:

Bash
uvicorn main:app --reload
The backend will now be running locally at http://127.0.0.1:8000

Step 3: Frontend Setup (Next.js)
Open a new terminal session, navigate to the root directory, and enter the frontend folder:

Bash
cd frontend
Install the necessary node packages:

Bash
npm install
Run the frontend Next.js development server:

Bash
npm run dev
The interactive user interface will now be accessible locally at http://localhost:3000

3. Content Creation Check (LinkedIn Promotional Post)
Transform your corporate events with an AI-driven, hyper-personalized attendee experience that bridges the gap between visitor interests and conference agendas instantly. Our smart single-page application leverages an interactive Next.js frontend paired with an intelligent Python backend to match attendee career challenges with specific sessions, automating custom B2B invitations on the fly. Say goodbye to generic event tracking and elevate your professional engagement strategy to a whole new level

4. Prompt Strategy
To eliminate systemic model hallucinations and enforce absolute compliance with the provided conference data, the LLM prompt architecture employs strict semantic grounding principles. The context engine extracts raw schedule strings exclusively from the verified local agenda.txt file and injects them into an unyielding system directive block. The model is bound by strong negative constraints stating: "You are an automated corporate assistant strictly prohibited from speculating, inventing, or referencing any speaker names, workshop topics, tracks, or times parameters omitted from the provided source context." Furthermore, a zero-shot programmatic fallback loop is hardcoded into the pipeline; if an applicant's professional challenge lacks factual or semantic overlap with the event tracks, the LLM prompt bypasses generative assumptions and cleanly redirects the client workflow to a pre-formatted, generalized event registration confirmation.
