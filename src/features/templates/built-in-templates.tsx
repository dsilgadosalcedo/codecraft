import React from "react"
import { Layout, PenTool, Zap } from "lucide-react"
import type { CustomTemplate } from "./use-custom-templates"

export type Template = CustomTemplate

export const builtInTemplates: Template[] = [
  {
    name: "Tailwind CSS",
    description: "Basic Tailwind CSS setup with utility classes",
    icon: <Layout className="h-6 w-6" />,
    category: "CSS",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Hello Tailwind!</h1>
        <p class="text-gray-600 mb-4">This is a simple example using Tailwind CSS utility classes.</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Click me
        </button>
    </div>
</body>
</html>`,
      css: `/* Add your custom CSS here */
.custom-class {
  /* Custom styles that complement Tailwind */
}`,
      js: `// Add your JavaScript here
document.querySelector('button').addEventListener('click', () => {
  alert('Button clicked!');
});`,
    },
  },
  {
    name: "React Components",
    description: "Basic React setup with functional components and hooks",
    icon: <PenTool className="h-6 w-6" />,
    category: "Framework",
    files: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState } = React;

        function App() {
          const [count, setCount] = useState(0);

          return (
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
              <h1>React Counter Example</h1>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
              <button onClick={() => setCount(count - 1)}>
                Decrement
              </button>
            </div>
          );
        }

        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>`,
      css: `/* React component styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}`,
      js: `// Additional JavaScript utilities
console.log('React app loaded!');

// You can add more utility functions here`,
    },
  },
  {
    name: "Vue Starter",
    description: "Basic Vue.js setup with reactive data and methods",
    icon: <Zap className="h-6 w-6" />,
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
        <h1>{{ title }}</h1>
        <p>Count: {{ count }}</p>
        <button @click="increment">Increment</button>
        <button @click="decrement">Decrement</button>
        
        <div style="margin-top: 20px;">
            <input v-model="message" placeholder="Type something...">
            <p>You typed: {{ message }}</p>
        </div>
    </div>
</body>
</html>`,
      css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  margin: 0;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}

input {
  padding: 8px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}`,
      js: `const { createApp } = Vue;

createApp({
  data() {
    return {
      title: 'Vue.js Example',
      count: 0,
      message: ''
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  },
  mounted() {
    console.log('Vue app mounted!');
  }
}).mount('#app');`,
    },
  },
]
