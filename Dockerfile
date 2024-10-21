# Stage 1: Build Client
FROM node:18-alpine AS client
WORKDIR /app
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run build
EXPOSE 4000

# Stage 2: Build Server (Go)
FROM golang:1.23.2-bullseye AS server
WORKDIR /app/server
COPY server/go.mod ./
COPY server/go.sum ./
RUN go mod download
COPY server/ ./
RUN go build -o main .
EXPOSE 8000
RUN ./main

# Stage 3: Production image
FROM nginx:alpine AS production
WORKDIR /app

# Copy built client files to the server
COPY --from=client /app/dist ./client
COPY --from=server /app/server/main ./server/main

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
