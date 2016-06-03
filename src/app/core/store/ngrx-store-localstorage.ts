// borrowed from:
// https://github.com/btroncone/ngrx-store-localstorage
// branch: storev2

const detectDate = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

//correctly parse dates from local storage
const parseWithDates = (jsonData: string) => {
    return JSON.parse(jsonData, (key: any, value: any) => {
        if (typeof value === 'string' && (this.detectDate.test(value))) {
            return new Date(value);
        }
        return value;
    });
};

const validateStateKeys = (keys: string[]) => {
    return keys.map(key => {
        if(typeof(key) !== 'string'){
            throw new TypeError(
                `localStorageSync Unknown Parameter Type: `
                + `Expected type of string, got ${typeof key}`
            );
        }
        return key;
    });
};

const rehydrateApplicationState = (keys: string[]) => {
    return keys.reduce((acc, curr) => {
        let stateSlice = localStorage.getItem(curr);
        if(stateSlice){
            return Object.assign({}, acc, { [curr]: JSON.parse(stateSlice) })
        }
        return acc;
    }, {});
};

const syncStateUpdate = (state : any, keys : string[]) => {
    keys.forEach(key => {
        let stateSlice = state[key];
        if (typeof(stateSlice) !== 'undefined') {
            try{
                localStorage.setItem(key, JSON.stringify(state[key]));
            } catch(e){
                console.warn('Unable to save state to localStorage:', e);
            }
        }
    });
};

export const localStorageSync = (keys : string[], rehydrate : boolean = false) => (reducer : any) => {
    const stateKeys = validateStateKeys(keys);
    const rehydratedState = rehydrate ? rehydrateApplicationState(stateKeys) : undefined;

    return function(state = rehydratedState, action : any){
        const nextState = reducer(state, action);
        syncStateUpdate(nextState, stateKeys);
        return nextState;
    };
};