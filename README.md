# immutable-reducers

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![travis-ci](https://travis-ci.org/phuu/immutable-reducers.svg?branch=master)](https://travis-ci.org/phuu/immutable-reducers)

Create reducers for [immutable][immutable] data structures. Useful for [redux][redux].

## Table of contents

* [Install](#install)
* [Use](#use)
* [`createReducer`](#createreducer)
* [`combineReducers`](#combinereducers)
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

const artistFansReducer = createReducer(['artis', 'fans'], (state, action) => {
    switch (action.type) {
        case 'NEW_FAN':
            return state + action.count;
    }
    return state;
});

// Combine 'em up

const reducer = combineReducers(artistNameReducer, artistFansReducer);

// Step the state

reducer(initialState, { type: 'NEW_FAN', count: 1 });

```

## `createReducer`

`createReducer` helps you make a reducer that operates on a small area of an immutable data structure.

```js
createReducer(keyPath: Array<any>, updater: (state: any, action: Object) => any): any
```

For example, given some initial state:

```js
const initialState = fromJS({
    user: {
        favorites: Immutable.OrderedSet()
    }
});
```

We can create a reducer that looks out for favorite actions and remembers the id:

```js
const favoriteReducer = createReducer(['user', 'favorites'], (favorites, action) => {
    switch (action.type) {
        case 'FAVORITE':
            return favorites.add(action.id);
    }
    return favorites;
});
```

`createReducer` handles reaching into the data structure and updating the value.

Good to know:

- If the updater function returns the same value it was called with, then no change will occur.
- If the `keyPath` you specify does not exist, an Immutable `Map` will be created at each intermediary key.
- The keys can be immutable data structures too #winning

## `combineReducers`

`combineReducers` is a less opinionated version of redux's default [`combineReducers`][redux-combinereducers] utility.

```js
type Reducer = (state: any, action: Object) => any;
type ReducerObject = Object<string, Reducer>;

combineReducers(...Reducer|ReducerObject): Reducer
```

It has two useful forms: applied to a list of reducers or to an object. When applied to the list, it acts like redux's combineReducers.

When applied to an object, it's slightly different. `immutable-reducers` will use the key of the object to 'scope' the reducer further.

For example, in the following example:
You could scope it to the `user` key of your (immutable) state using `combineReducers`:

```js
const combineReducer = combineReducers({
    user: createReducer(['favorites'], (favorites, action) => {
        switch (action.type) {
            case 'FAVORITE':
                return favorites.add(action.id);
        }
        return favorites;
    });
});
```

The end result is the same as the `createReducers` example, where the `favoritesReducer` will actually operate on the `['user', 'favorites']` key path.

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
[redux-combinereducers]: http://rackt.github.io/redux/docs/api/combineReducers.html
