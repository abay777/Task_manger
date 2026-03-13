FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./

RUN npm ci --only=production

# Copy application code
COPY . .

# Use non-root user for security
USER node

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start the app
CMD ["node","main.js"]