import { assert } from 'chai';
import { fromJS } from 'immutable';

import { combineReducers, createReducer } from '.';

const initialState = fromJS({
  artist: {
    name: {
      first: 'Sean',
      last: 'Combs'
    },
    followers: 0
  },
  albums: [
    { name: 'No Way Out', year: '1997' },
    { name: 'Forever', year: '1999' }
  ],
  related: {
    artist: {
      name: {
        first: 'Mary J.',
        last: 'Blige'
      },
      followers: 0
    }
  }
});

const nameReducer = createReducer(['artist', 'name'], (name, action) => {
  switch (action.type) {
    case 'RENAME':
      return fromJS(action.value);
  }
  return name;
});

const followersReducer = createReducer(['artist', 'followers'], (followers, action) => {
  switch (action.type) {
    case 'FOLLOW':
      return followers + action.value;
  }
  return followers;
});

const albumsReducer = createReducer(['albums'], (albums, action) => {
  switch (action.type) {
    case 'RELEASE':
      return albums.push(fromJS(action.value));
  }
  return albums;
});

const fakePathReducer = createReducer(['this', 'path', 'is', 'fake'], (_, action) => {
  return fromJS({ no: 'thanks' });
});

const actions = {
  FOLLOW: { type: 'FOLLOW', value: 1 },
  RENAME: { type: 'RENAME', value: { first: 'Puff', last: 'Daddy' } },
  NOOP: { type: 'NOOP', value: {} },
  RELEASE: { type: 'RELEASE', value: { name: 'The Saga Continues...', year: '2001' } }
};

describe('createReducer', () => {
  it('creates reducers than can reach into data structures', () => {
    assert(
      followersReducer(initialState, actions.FOLLOW).getIn(['artist', 'followers']) === 1,
      'followers state is incremented by 1'
    );
  });

  it('does not modify the data if nothing changes', () => {
    assert(
      nameReducer(initialState, actions.NOOP) === initialState,
      'data is untouched'
    );
  });

  it('can handle non-existant paths', () => {
    assert(
      fakePathReducer(initialState, actions.NOOP).hasIn(['this', 'path', 'is', 'fake']),
      'non-existant path is created'
    );
  });

  it('passes whole state object', () => {
    const reducer = createReducer(['artist'], (artist, action, state) => {
      assert(
        state === initialState,
        'is passed initialState'
      );
      assert(
        artist === state.get('artist'),
        'gets target state object'
      );
    });

    reducer(initialState, {});
  });

  it('the state object is passed through composition', () => {
    const nameReducer = createReducer(['name'], (name, action, state) => {
      assert(
        state === initialState,
        'is passed initialState'
      );
      assert(
        name === initialState.getIn(['artist', 'name']),
        'gets target state object'
      );
      return name;
    });

    const reducer = combineReducers({
      artist: nameReducer
    });

    reducer(initialState, {});
  });
});

describe('combineReducers', () => {
  it('can take an object to scope reducer', () => {
    const combinedReducer = combineReducers({
      related: followersReducer
    });
    const result = combinedReducer(initialState, actions.FOLLOW);

    assert(
      result.getIn(['related', 'artist', 'followers']) === 1,
      'scoped data is updated'
    );
  });

  it('can combine reducers in a sequence', () => {
    const combinedReducer = combineReducers(nameReducer, albumsReducer);
    const result = combinedReducer(initialState, actions.RELEASE);

    assert(
      result.get('albums').count() === 3,
      'albums is updated'
    );
    assert(
      result.get('artist') === initialState.get('artist'),
      'artist is untouched'
    );
  });

  it('can combine combined reducers', () => {
    const artistReducer = combineReducers(nameReducer, followersReducer);
    const combinedReducer = combineReducers(artistReducer, albumsReducer);
    const result = combinedReducer(initialState, actions.RENAME);

    assert(
      result.get('albums').count() === 2,
      'albums is updated'
    );
    assert(
      result.get('artist') !== initialState.get('artist'),
      'artist is touched'
    );
  });
});
