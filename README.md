# NoBrain - AI Automation Platform

A modern, intuitive AI automation platform that allows users to create and manage workflows without writing code. Built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### Authentication System
- **Signup Page** (`/auth/signup`) - User registration with form validation
- **Login Page** (`/auth/login`) - Secure user authentication
- Modern UI with glassmorphism effects and smooth animations

### User Dashboard (`/dashboard`)
- **Overview Tab**: Quick stats, recent activity, and quick actions
- **Ongoing Workflows**: Real-time monitoring of active automation workflows
- **Saved Workflows**: Browse and manage workflow templates
- Interactive cards for easy navigation between different sections

### Workflow Creation (`/workflow/create`)
- **Step 1**: Basic information collection (name, description, platform selection)
- **Step 2**: Workflow type selection and scheduling configuration
- **Step 3**: Summary review before proceeding to editor
- Progress indicator with visual feedback

### Workflow Editor (`/workflow/editor`)
- **Visual Editor**: Drag-and-drop interface for building workflows
- **Node Palette**: Pre-built automation nodes (triggers, AI agents, actions)
- **Properties Panel**: Configure individual nodes with settings
- **Credentials Management**: Connect and test external platform APIs
- **Run History**: View past executions with detailed logs and outputs

## 🎨 UI/UX Highlights

### Design System
- **Dark Theme**: Consistent dark color scheme throughout the application
- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Gradient Backgrounds**: Subtle gradients for visual depth
- **Responsive Design**: Mobile-first approach with responsive layouts

### Color Palette
- **Primary**: Blue (#3B82F6) for main actions and branding
- **Secondary**: Purple (#8B5CF6) for secondary elements
- **Success**: Green (#10B981) for positive states
- **Warning**: Yellow (#F59E0B) for caution states
- **Error**: Red (#EF4444) for error states
- **Neutral**: Gray scale for text and backgrounds

### Interactive Elements
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Visual feedback during operations
- **Status Indicators**: Clear visual representation of workflow states
- **Progress Bars**: Step-by-step progress indication

## 📁 Project Structure

```
app/
├── auth/
│   ├── login/page.tsx          # Login page
│   └── signup/page.tsx         # Signup page
├── dashboard/page.tsx          # Main dashboard
├── workflow/
│   ├── create/page.tsx         # Workflow creation wizard
│   └── editor/page.tsx         # Visual workflow editor
├── page.tsx                    # Landing page with auto-redirect
├── layout.tsx                   # Root layout
└── globals.css                 # Global styles

components/
├── ui/                         # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   └── textarea.tsx
├── Navbar.tsx                  # Navigation component
├── Sidebar.tsx                 # Workflow sidebar
├── WorkflowCanvas.tsx          # ReactFlow canvas
└── NodeConfigPanel.tsx         # Node configuration panel
```

## 🔧 Technical Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React for consistent iconography
- **Workflow Editor**: ReactFlow for drag-and-drop functionality
- **TypeScript**: Full type safety throughout the application

## 🎯 User Flow

1. **Landing Page** → Auto-redirects to login after 3 seconds
2. **Authentication** → Signup/Login with modern form validation
3. **Dashboard** → Overview of workflows, stats, and quick actions
4. **Create Workflow** → 3-step wizard for workflow configuration
5. **Workflow Editor** → Visual drag-and-drop editor with:
   - Node palette for building workflows
   - Properties panel for configuration
   - Credentials management for external platforms
   - Run history with detailed logs

## 📊 Dummy Data

The application includes comprehensive dummy data for demonstration:

### Dashboard Stats
- Active Workflows: 12
- Success Rate: 94%
- Total Runs: 1,247
- Time Saved: 47 hours

### Sample Workflows
- LinkedIn Auto-Post (Running)
- Email Newsletter (Paused)
- Content Aggregator (Running)
- Twitter Engagement Bot (Saved)
- Customer Support Automation (Saved)

### Platform Integrations
- LinkedIn (Connected)
- Gmail (Connected)
- Slack (Error - needs reconnection)
- Google Calendar (Not connected)

### Workflow Runs
- Recent executions with timestamps
- Success/error status indicators
- Detailed output logs
- Performance metrics

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization

### Theme Colors
Update the color scheme in `app/globals.css`:
```css
:root {
  --primary: oklch(0.488 0.243 264.376);
  --secondary: oklch(0.269 0 0);
  /* ... other color variables */
}
```

### Component Styling
All components use Tailwind CSS classes and can be customized by modifying the className props.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- Form validation on client-side
- Secure password input fields
- Protected routes (authentication required)
- Input sanitization for user data

## 🎯 Future Enhancements

- Real-time workflow execution monitoring
- Advanced AI node configurations
- Workflow templates marketplace
- Team collaboration features
- Advanced analytics and reporting
- Mobile app development

---

Built with ❤️ for seamless AI automation workflows.