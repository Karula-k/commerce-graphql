FROM node:20.18

# Create app directory, this is in our container/in our image
WORKDIR /home/nest/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install


# Bundle app source
COPY . .

# Generate Prisma client for the container environment
RUN npx prisma generate

RUN npm run build


EXPOSE 4000
    CMD ["npm", "run", "start"]
# Run migrations: docker-compose exec api npx prisma migrate deploy
# seed: docker-compose exec api npx prisma db seed