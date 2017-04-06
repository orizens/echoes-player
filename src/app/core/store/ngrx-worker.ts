// import { WebWorkerService } from 'angular2-web-worker/web-worker';

// export function reducerWorker (keys) {
//     // if (rehydrate === void 0) { rehydrate = false; }
//     // if (storage === void 0) { storage = localStorage; }
//     const reducerWorker = new WebWorkerService();
//     return function (reducer) {
//         return function (state, action) {
//             //if (state === void 0) { state = rehydratedState; }
//             /*
//              Handle case where state is rehydrated AND initial state is supplied.
//              Any additional state supplied will override rehydrated state for the given key.
//              */
//             // if (action.type === INIT_ACTION && rehydratedState) {
//             //     state = Object.assign({}, state, rehydratedState);
//             // }
//             var nextState = {};
//             reducerWorker.run(reducer(state, action)).then(result => Object.assign(nextState, result));
//             // exports.syncStateUpdate(nextState, stateKeys, storage);
//             return nextState;
//         };
//     };
// };
