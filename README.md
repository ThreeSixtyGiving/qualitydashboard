# registry-vue2

## Project setup
```
npm install
```

### Compile theme
Make sure the git submodule is checked out and the theme is compiled
```
cd 360-ds
npm install
npm run compile-sass -- --path ../registry-vue/src/assets/styles/
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Registry, Flask, Vue and You

At present the vue application is set to build into the flask application at the default folders in the subdirectory `vue-build`.
You can run the vue application for development as above (i.e. `npm run serve`), but you can also do a production build into the flask application and run it through flask as per the root `README.md`.
