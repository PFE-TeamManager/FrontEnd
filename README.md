1 - Setting up folder aliases

@ symbol for root

import of components like this : import 'components/SomeComponent.js'

folder : app.config.js

const path = require('path');
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                components: path.resolve('./src/components'),
                store: path.resolve('./src/store')
            }
        }
    }
}

- wherever you are in your project you’d be able to reference anything inside your src/components folder by just using components as the starting folder in your import statement. The same goes for anything in your src/store folder

2 - Add a base class to all styles
3 - Passing scoped styles down to child components