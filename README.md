# Quality Dashboard

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

### Proxying the live api for testing

For testing purposes you may want to use the live api. A possible approach for this is to use a reverse proxy.

Apache2 Example:

```apache2
<VirtualHost *:443>
...
        SSLProxyEngine on
        ProxyPass "/datastore" "https://store.data.threesixtygiving.org"
        ProxyPassReverse "/datastore" "https://store.data.threesixtygiving.org"
        Header set Access-Control-Allow-Origin "*"
...
</VirtualHost>
```

(requires mod_ssl, mod_proxy, mod_headers)

Then:
```
 $ export VUE_APP_DATASTORE_API=https://localhost/datastore/api/dashboard/
 $ npm run serve
```
