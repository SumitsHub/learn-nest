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