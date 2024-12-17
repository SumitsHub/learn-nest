### Files generation
>> Generate modules - computer, cpu, disk, power

>> Generate services - cpu, disk, power

>> Generate controller - computer


### DI Between Modules (Power Module and CPU Module)
1. Add PowerService to the PowerModule's list of 'exports'
2. Import the PowerModule into the CPUModule -> list of 'imports'
3. Define the constructor method on CPUService and add PowerService to it

NOTE: By default Services are private to respective modules unless exported explicitly for module
