### Install nest CLI globally
```bash
npm install -g @nestjs/cli
```

### Generate new project
```bash
nest new [app-name]
```

### Generate module using nest cli
```bash
nest generate module [module-name]
```

### Generate controller using nest cli
```bash
nest generate controller [controller-file-path/controller-class-name] [--flat]
```
- flat: don't create extra folder called 'controllers'
ex:
```bash
nest generate controller messages/messages --flat
```


### Calling REST api using REST Client VSCode extension
- Install REST Client extension by "Huachao Mao"
- Create file named 'requests.http'
- Add endpoints to the file and test using 'Send request' button provided by the extension


### Parameter decorators
- @Param('id')
- @Query()
- @Body()
- @Headers()

### Setting up Automatic Validation
Step 1. Tell nest to use global validation
Step 2. Create a class that describes the different properties that the request body should have - Data Transfer Object[DTO]
Step 3. Add validation rules to the class
Step 4. Apply that class to the request handler