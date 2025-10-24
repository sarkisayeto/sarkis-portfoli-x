# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Arguments de build pour les variables d'environnement Vite
ARG VITE_API_BASE_URL
ARG VITE_CLOUDINARY_CLOUD_NAME
ARG VITE_CLOUDINARY_UPLOAD_PRESET
ARG VITE_WHATSAPP_NUMBER
ARG VITE_WHATSAPP_MESSAGE

# Les rendre disponibles au build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_CLOUDINARY_CLOUD_NAME=$VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET=$VITE_CLOUDINARY_UPLOAD_PRESET
ENV VITE_WHATSAPP_NUMBER=$VITE_WHATSAPP_NUMBER
ENV VITE_WHATSAPP_MESSAGE=$VITE_WHATSAPP_MESSAGE

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the built app
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
