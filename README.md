This capstone project is a Node.js + Express web application that provides real-time text-to-speech conversion using the OpenAI speech APIs. 
The frontend is a lightweight HTML/JS interface that sends text and mode settings to the backend, which processes the request, 
applies custom voice parameters (speed, accent, stability, style), and streams back generated audio. The mediaplayer supports 2 voice modes, seamless play/pause functionality.

To run the APP:

1. Clone the project
   "git clone https://github.com/NH-Uday/TTS.git"
2. Install dependencies
   "npm install"
3. Create a new .env file
   OPENAI_API_KEY=#
   OPENAI_TTS_MODEL=#  
   OPENAI_TTS_VOICE=#
   PORT=#
4. Start the server
   "node server.js"
   If you're using nodemon:
   "npm run dev"
