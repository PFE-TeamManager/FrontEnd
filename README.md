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

II - Redux

Single source of truth
The global state of your application is stored in an object tree within a single store.

State is read-only
The only way to change the state is to emit an action, an object describing what happened.

Changes are made with pure functions
To specify how the state tree is transformed by actions, you write pure reducers.
Reducers are just pure functions that take the previous state and an action, and return the next state.