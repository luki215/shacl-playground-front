# ShaclEditor

This is semestral project for [Linked data course on VŠE](https://nb.vse.cz/~svatek/rzzw.html).

# Install
Run `yarn`.

App assumes that the [editor BE](https://github.com/luki215/shacl-playground-back) is running on http://localhost:5000. In case that not, edit the `environments/environment(.*).ts` -> `apiURL` correspondingly.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run production version
```docker run --rm -p 80:80 luki215/shacl-editor-fe```

## Build
```docker build -f Dockerfile-prod -t shacl-editor-fe .```

## Docker publish
Is done automatically with publishing a new tag via
`yarn release:patch` or
`yarn release:minor` or
`yarn release:major`
