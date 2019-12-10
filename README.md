# ShaclEditor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

# Install
Run `yarn`.

App assumes that the [editor BE](https://github.com/luki215/shacl-playground-back) is running on http://localhost:5000. In case that not, edit the `environments/environment(.*).ts` -> `apiURL` correspondingly.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Build
```docker build -f Dockerfile-prod -t luki215:shacl-editor-fe .```
