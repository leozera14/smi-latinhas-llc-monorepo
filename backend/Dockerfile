FROM node:24-alpine

WORKDIR /app

# Copy package.json and package.lock.json 
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Expose port
EXPOSE 3333

# Init command
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]