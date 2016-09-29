gitty
===

The github event browser.
------

A project developed using `node` to provide simple APIs on github events.

#### Features:
 * APIs with complete documentation according to `API Blueprint` spec.
 * Quick setup using `docker` and `npm`.
 * No production dependencies other than `mongodb` database driver.
 * Standard design patterns like `middlewares` for easy middleware hooks.
 * ES6 Standard

#### Configuration
 * The configuration files have to be placed in the config directory and should have filename pattern: `<env>.json`.
 * Based on the env is set (Ex: export NODE_ENV=test), an appropriate configuration file will be loaded when app starts.
 * The config file should be a valid JSON file with following fields.

```js
{
    "db": {
        // This is a mandatory field, will be used to connect to mongo db server.
        "uri": '<mongodb database uri>' // Ex: "mongodb://localhost/gitty"
    },


    "server": {
        // The mandatory field port number to let server know
        // on which port server should listen.
        "port": '<port number on which app should listen>' // Ex: 3000

        // This is an optional parameter to let server
        // know on what hostname server should start.
        "interface": '<optional hostname>' // Ex: "127.0.0.1"
    }
}
```


#### Installation

```bash
# NOTE: Optionally pass --production to skip dev dependencies on prod environments.
npm install

# Edit env specific config file to set the port, database and other settings.
# Ex: config/production.json

export NODE_ENV=<env>
# Ex: export NODE_ENV=production

# Dump data.
# Download source file (Command on linux).
wget -c 'http://data.githubarchive.org/2015-01-01-15.json.gz'
gzip -dv 2015-01-01-15.json.gz

# Load
npm run dump <JSON file path>
# Ex: `npm run dump 2015-01-01-15.json`

npm start
```

#### [Demonstration](https://github.com/royalpinto/gitty/tree/dev/demo)

#### Documentation
APIs are documented according to [API Blueprint](https://apiblueprint.org/) specification. Use your favorite API Blueprint renderer tool to render from the API documentation available here: [doc/api.apib](https://github.com/royalpinto/gitty/blob/dev/doc/api.apib).

One example of generating doc from the API spec is given below:
```bash
# Install `aglio` https://github.com/danielgtaylor/aglio
npm install aglio

# Convert doc spec to html and open it on the browser.
aglio -i doc/api.apib -o output.html
```
