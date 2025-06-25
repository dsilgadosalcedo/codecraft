import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useWorkspaceStore } from "../store/useWorkspaceStore"
import {
  FileText,
  Globe,
  BookOpen,
  Code,
  Sparkles,
  Plus,
  FolderOpen,
  X,
} from "lucide-react"

interface Template {
  name: string
  description?: string
  files: { html: string; css: string; js: string }
  icon?: React.ReactNode
  category?: string
}

const builtInTemplates: Template[] = [
  {
    name: "Landing Page",
    description:
      "Simple landing page layout with modern design and responsive components",
    icon: <Globe className="h-6 w-6" />,
    category: "Web",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body>
    <header>
        <nav>
            <h1>Brand</h1>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="hero">
            <h1>Welcome to Our Platform</h1>
            <p>Build amazing things with our tools</p>
            <button class="cta-button">Get Started</button>
        </section>
    </main>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;
}

.cta-button:hover {
  background: #ff5252;
}`,
      js: `document.querySelector('.cta-button').addEventListener('click', function() {
  alert('Welcome! Ready to get started?');
});`,
    },
  },
  {
    name: "Blog Post",
    description:
      "Clean blog post layout with typography and reading experience focus",
    icon: <BookOpen className="h-6 w-6" />,
    category: "Content",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post</title>
</head>
<body>
    <article class="blog-post">
        <header class="post-header">
            <h1>The Future of Web Development</h1>
            <div class="post-meta">
                <span class="author">By John Doe</span>
                <span class="date">March 15, 2024</span>
            </div>
        </header>
        <div class="post-content">
            <p>Web development continues to evolve at a rapid pace. In this post, we'll explore the latest trends and technologies shaping the future of web development.</p>
            <h2>Modern Frameworks</h2>
            <p>React, Vue, and Angular continue to dominate the frontend landscape, while new frameworks like Svelte are gaining popularity.</p>
            <h2>Backend Evolution</h2>
            <p>Node.js, Python, and Go are leading the way in backend development, with serverless architectures becoming increasingly popular.</p>
        </div>
    </article>
</body>
</html>`,
      css: `body {
  font-family: 'Georgia', serif;
  line-height: 1.8;
  color: #2c3e50;
  background: #f8f9fa;
  margin: 0;
  padding: 2rem;
}

.blog-post {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.post-header {
  margin-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 1rem;
}

.post-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #7f8c8d;
  font-style: italic;
}

.post-content h2 {
  color: #34495e;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}`,
      js: `// Add reading time calculation
const content = document.querySelector('.post-content');
const wordsPerMinute = 200;
const textLength = content.textContent.split(' ').length;
const readingTime = Math.ceil(textLength / wordsPerMinute);

const readingTimeElement = document.createElement('span');
readingTimeElement.textContent = \`\${readingTime} min read\`;
readingTimeElement.className = 'reading-time';
document.querySelector('.post-meta').appendChild(readingTimeElement);`,
    },
  },
  {
    name: "Vue Starter",
    description:
      "Vue.js application starter template with reactive components and modern styling",
    icon: <Code className="h-6 w-6" />,
    category: "Framework",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue App</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
    <div id="app">
        <div class="container">
            <header class="app-header">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
            </header>
            <main>
                <div class="counter-section">
                    <h2>Interactive Counter</h2>
                    <div class="counter">
                        <button @click="decrement" class="btn btn-secondary">-</button>
                        <span class="count">{{ count }}</span>
                        <button @click="increment" class="btn btn-primary">+</button>
                    </div>
                </div>
                <div class="todo-section">
                    <h2>Quick Todo</h2>
                    <div class="todo-input">
                        <input 
                            v-model="newTodo" 
                            @keyup.enter="addTodo"
                            placeholder="Add a new task..."
                            class="input"
                        >
                        <button @click="addTodo" class="btn btn-primary">Add</button>
                    </div>
                    <ul class="todo-list">
                        <li v-for="(todo, index) in todos" :key="index" class="todo-item">
                            <span>{{ todo }}</span>
                            <button @click="removeTodo(index)" class="btn btn-danger">×</button>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
}

.app-header {
  background: #4a90e2;
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

main {
  padding: 2rem;
}

.counter-section, .todo-section {
  margin-bottom: 2rem;
}

.counter-section h2, .todo-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  color: #4a90e2;
  min-width: 3rem;
  text-align: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #4a90e2;
  color: white;
}

.btn-primary:hover {
  background: #357abd;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-danger:hover {
  background: #c82333;
}

.todo-input {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #4a90e2;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
}`,
      js: `const { createApp } = Vue;

createApp({
  data() {
    return {
      title: 'Welcome to Vue!',
      description: 'A progressive JavaScript framework',
      count: 0,
      newTodo: '',
      todos: ['Learn Vue.js', 'Build awesome apps', 'Have fun coding!']
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push(this.newTodo.trim());
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}).mount('#app');`,
    },
  },
  {
    name: "Tailwind Starter",
    description: "Starter template with Tailwind CSS via CDN",
    icon: <Sparkles className="h-6 w-6" />,
    category: "CSS",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tailwind Starter</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="p-6 bg-white rounded-xl shadow-lg text-center">
    <h1 class="text-3xl font-bold mb-4">Hello, Tailwind!</h1>
    <p class="text-gray-600">Your Tailwind CSS environment is ready.</p>
  </div>
</body>
</html>`,
      css: ``,
      js: ``,
    },
  },
]

export default function TemplateSelector() {
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(
    (state) => state.updateWorkspaceFiles
  )
  const [customTemplates, setCustomTemplates] = useState<Template[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("customTemplates")
    if (stored) setCustomTemplates(JSON.parse(stored))
  }, [])

  const saveCustomTemplate = () => {
    const name = prompt("Template name:")
    if (!name) return
    const state = useWorkspaceStore.getState()
    const current = state.workspaces.find(
      (ws) => ws.id === state.currentWorkspaceId
    )
    if (!current) return
    const newTemplate: Template = {
      name,
      description: "Custom template saved from workspace",
      icon: <Sparkles className="h-6 w-6" />,
      category: "Custom",
      files: { html: current.html, css: current.css, js: current.js },
    }
    const updated = [...customTemplates, newTemplate]
    setCustomTemplates(updated)
    localStorage.setItem("customTemplates", JSON.stringify(updated))
  }

  const useTemplate = (template: Template) => {
    createWorkspace(template.name)
    updateWorkspaceFiles(template.files)
    setIsOpen(false)
  }

  // Filter out Landing Page and Blog Post, then add React Starter
  const filteredBuiltInTemplates = builtInTemplates.filter(
    (template) => template.category !== "Web" && template.category !== "Content"
  )

  const allTemplates = [
    ...filteredBuiltInTemplates,
    {
      name: "React Starter",
      description: "Starter template with React via CDN",
      icon: <Code className="h-6 w-6" />,
      category: "Framework",
      files: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Starter</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>
<body class="p-6 bg-white">
  <div id="root"></div>
  <script>
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      React.createElement('div', { className: 'p-6 bg-white rounded-xl shadow-lg text-center' },
        React.createElement('h1', { className: 'text-3xl font-bold mb-4' }, 'Hello, React via CDN!'),
        React.createElement('p', { className: 'text-gray-600' }, 'Your React environment is ready.')
      )
    );
  </script>
</body>
</html>`,
        css: ``,
        js: ``,
      },
    },
    ...customTemplates,
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Browse Templates" className="w-full">
          <FileText className="h-4 w-4" />
          <span>Templates</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FolderOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                Template Library
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Choose from our collection of professional templates to
                kickstart your project
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {allTemplates.map((template, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
                onClick={() => useTemplate(template)}
              >
                {/* Template Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                    {template.icon || (
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  {template.category && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {template.category}
                    </span>
                  )}
                </div>

                {/* Template Info */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {template.description ||
                      "A professional template to get you started quickly"}
                  </p>
                </div>

                {/* Use Template Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    useTemplate(template)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Use Template
                </Button>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="pt-4 border-t bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={saveCustomTemplate}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Save Current as Template
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
