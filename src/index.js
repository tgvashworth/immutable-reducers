/**
 * Combine multiple reducers into a single, with optional scoping
 *
 * Example:

      combineReducers(userReducer, followersReducer)

      // Scoped to key 10
      item10Reducer = combineReducers({
        10: itemReducer
      })

      // Compose 'em up
      basketItem10Reducer = combineReducers({
        basket: item10Reducer
      })

 * Returns a reducing function.
 */
const combineReducers = (...rawReducers) => {
  const reducers = rawReducers.reduce((rs, reducer) => {
    // Keep the plain 'ol functions
    if (typeof reducer === 'function') {
      return rs.concat(reducer);
    }

    // Scope the reducers by their keys, if keyed they are
    if (typeof reducer === 'object' && !Array.isArray(reducer)) {
      return Object.keys(reducer).reduce((rs, k) => {
        // Value is a function, so we can make it into a reducer!
        if (typeof reducer[k] === 'function') {
          return rs.concat(
            createReducer([k], reducer[k])
          );
        }

        // Ignore it
        return rs;
      }, rs);
    }

    // Otherwise, ignore this one
    return rs;
  }, []);

  // Return a function that iterates over the reducers and reduces from some initial state,
  // with an action as input. Easy now.
  return (initialState, action) =>
    reducers.reduce(
      (state, reducer) => reducer(state, action),
      initialState
    );
};

/**
 * Create a reducer scoped to the specified keys.
 *
 * Example:

      createReducer(['user', 'followers'], (state, action) => {
        if (action.type === 'FOLLOW') {
          return state + 1;
        }
        return state;
      })

 * Returns a reducing function.
 */
const createReducer = (path, reducer) => (initialState, action) =>
  initialState.updateIn(path, v => reducer(v, action));

export default {
  combineReducers,
  createReducer
};
