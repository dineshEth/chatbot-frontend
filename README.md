# ChatBot Frontend

A modern Next.js chatbot application with beautiful UI, animations, and dark/light mode support.

## Features

- **Modern UI**: Built with Next.js 16, Tailwind CSS v4, and Framer Motion
- **Beautiful Theme**: Blue/Pink gradient theme with dark and light mode
- **Animated Chat Bubbles**: Smooth animations for message appearance
- **Responsive Design**: Works on all screen sizes
- **No Authentication**: Simple and straightforward to use
- **Typing Indicators**: Animated typing indicators when waiting for responses

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd chatbot-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update the API base URL in `.env.local` if needed:
```
NEXT_PUBLIC_API_BASE_URL=https://node-backend-deploy-xmwo.onrender.com
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
chatbot-frontend/
├── src/
│   ├── app/
│   │   ├── globals.css       # Custom theme and styles
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── page.tsx          # Main chat page
│   ├── components/
│   │   ├── ChatInput.tsx     # Message input component
│   │   ├── ChatMessage.tsx   # Message bubble component
│   │   ├── Header.tsx        # Header with branding
│   │   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   │   └── TypingIndicator.tsx # Loading indicator
│   ├── context/
│   │   ├── ChatContext.tsx   # Chat state management
│   │   └── ThemeContext.tsx  # Theme state management
│   ├── services/
│   │   └── api.ts           # API client for backend calls
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── .env.local               # Environment variables
├── .env.example             # Example environment file
└── package.json
```

## API Endpoints

The application connects to the following backend endpoints:

- **Health Check**: `GET /health` - Returns application health status
- **Chatbot**: `POST /api/chatbot` - Send messages to the chatbot

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API | `https://node-backend-deploy-xmwo.onrender.com` |

### Theme Customization

The theme colors can be customized in `src/app/globals.css`:

- `--color-primary`: Primary brand color (Blue)
- `--color-secondary`: Secondary brand color (Pink)
- `--color-background`: Background color
- `--color-surface`: Card/surface background
- `--color-foreground`: Text color
- `--color-user-bubble`: User message bubble color
- `--color-assistant-bubble`: Assistant message bubble color

## Features in Detail

### Dark/Light Mode

- Automatic detection of system preference
- Manual toggle with smooth transitions
- Persists user preference in localStorage
- Custom CSS variables for each theme

### Chat Features

- Real-time message display with animations
- User and assistant messages styled differently
- Timestamp display for each message
- Typing indicators when waiting for responses
- Error handling and display

### Animations

- Fade-in animations for messages
- Scale animations for message bubbles
- Smooth transitions between themes
- Animated typing indicators

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Render
- Any Node.js server

## License

MIT
