# immutable-reducers

Create reducers for [immutable][immutable] data structures. Useful for [redux][redux].

## Table of contents

* [Install](#install)
* [Use](#use)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save immutable-reducers
```

## Use

```js
import { fromJS } from 'immutable';
import { combineReducers, createReducer } from 'immutable-reducers';

// Setup some state (probably your app state)

const initialState = fromJS({
    artist: {
        name: {
            first: 'Sean',
            last: 'Combs'
        },
        fans: 0
    }
});

// Create some reducers

const artistNameReducer = createReducer(['artist', 'name'], (state, action) => {
    switch (action.type) {
        case 'RENAME':
            return fromJS(action.value);
    }
    return state;
});

// You can scope them by combining with an object

const fansReducer = createReducer(['fans'], (state, action) => {
    switch (action.type) {
        case 'NEW_FAN':
            return state + action.count;
    }
    return state;
});

const artistFansReducer = combineReducers({
    artist: fansReducer // the full path is then ['artist', 'fans']
});

// Combine 'em up

const reducer = combineReducers(artistNameReducer, artistFansReducer);

// Step the state

reducer(initialState, { type: 'NEW_FAN', count: 1 });

```

## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to [rackt][rackt] for [redux][redux] and all those who work on [immutable][immutable].

## License

Copyright (c) 2015 Tom Ashworth. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/phuu/immutable-reducers/blob/master/CONTRIBUTING.md
[immutable]: https://facebook.github.io/immutable-js/
[rackt]: https://github.com/rackt
[redux]: http://rackt.github.io/redux/

