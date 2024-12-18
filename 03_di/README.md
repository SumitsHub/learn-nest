### Files generation
>> Generate modules - computer, cpu, disk, power

>> Generate services - cpu, disk, power

>> Generate controller - computer


### DI Between Modules (Power Module and CPU Module)
1. Add PowerService to the PowerModule's list of 'exports'
2. Import the PowerModule into the CPUModule -> list of 'imports'
3. Define the constructor method on CPUService and add PowerService to it

NOTE: By default Services are private to respective modules unless exported explicitly for module


### Docker for Nest App
1. Create a Dockerfile - The Dockerfile defines the instructions for building the Docker image. Place it in the root directory of your NestJS project.
2. Create a .dockerignore File - Exclude unnecessary files from the Docker build context by creating a .dockerignore file. Place this in the root directory.
3. Build and Run the Docker Image - Use the following commands to build and run the Docker image:
- 01. Build the image: 
```bash 
    docker build -t nest-app . 
```
- 02. Run the container:
```bash
docker run -p 3000:3000 --name nest-container nest-app
```

Your app will now be available at http://localhost:3000
