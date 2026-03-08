# Stage 1 — Build the React app
FROM node:18-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package files first (for faster builds)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

# Copy built files from Stage 1 into Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
