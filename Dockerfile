FROM node:22-alpine

# Cree un espace de travial
WORKDIR /app

# on copie les files de deps
COPY package*.json ./

# installer les deps de notre app
RUN npm install

# Copier tous les autres Fichiers
COPY . .

# Build, compile notre app, si necessaire
RUN npm run build

ENV VITE_API_URL=""

EXPOSE 3000

CMD [ "npm", "run", "dev" , "--", "--port", "3000" ]

# Build Image 
# docker build -t todo-app .