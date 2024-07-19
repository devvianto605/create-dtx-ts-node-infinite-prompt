#!/bin/bash

# Check if a project name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project-name>"
  exit 1
fi

# Set the project directory from the argument
PROJECT_DIR="$1"

# Create project directory and navigate into it
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Initialize a new Node.js project
npm init -y

# Install TypeScript, ts-node, and @types/node as dev dependencies
npm install typescript ts-node @types/node --save-dev

# Create a tsconfig.json file
npx tsc --init

# Create a basic TypeScript file
cat <<EOT > index.ts
const greeting: string = "Hello, TypeScript with Node!";
console.log(greeting);
EOT

# Add scripts to package.json
npx json -I -f package.json -e 'this.scripts={
  "start": "ts-node index.ts",
  "build": "tsc --outDir dist",
  "serve": "node dist/index.js"
}'

# Compile TypeScript to JavaScript
npx tsc --outDir dist

# Output completion message
echo "TypeScript project setup complete in directory $PROJECT_DIR. You can run your project using:"
echo "  npm start   # To run with ts-node"
echo "  npm run build  # To compile TypeScript to JavaScript"
echo "  npm run serve  # To run the compiled JavaScript with Node.js"
