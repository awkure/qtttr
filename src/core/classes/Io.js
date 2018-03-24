// @flow 

import { compose } from 'rambda'

export default class IO<T> {
    unsafePerformIO : () => T 

    static of (x : T) : IO<() => T> {
        return new IO(() => x)
    }

    constructor (f : Function) {
        this.unsafePerformIO = f 
    }

    map (f : Function) : IO<() => T> {
        return new IO(compose(f, this.unsafePerformIO))
    }

    ap (f : Function) : () => T {
        return this.chain(g => f.map(g))
    }

    chain (f : Function) : () => T {
        return this.map(f).join()
    }

    join () : T {
        return this.unsafePerformIO()
    }
}