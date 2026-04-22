# Stage 1: Build the React app using Vite
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom Nginx configuration which listens on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run expected port)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
