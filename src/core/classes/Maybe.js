// @flow

const id = <T>(a : T) => a

export default class Maybe<T> {
    _v : T

    static of (x : T) : Maybe<T> {
        return new Maybe(x)
    }

    get isNothing () : boolean {
        return !!this._v === null || !!this._v === undefined 
    }

    get isJust () : boolean {
        return !this.isNothing
    }

    constructor (x : T) {
        this._v = x
    }

    map (f : Function) : Maybe<T> {
        return this.isNothing ? this : Maybe.of(f(this._v))
    }

    ap (f : Function) : Maybe<T> {
        return this.isNothing ? this : f.map(this._v)
    }

    chain (f : Function) : Maybe<T> | T {
        return this.map(f).join()
    }

    join () : Maybe<T> | T {
        return this.isNothing ? this : this._v
    }

    sequence(o : Function) {
        this.traverse(o, id)
    }

    traverse(o : Maybe<T> => *, f : T => *) : * {
        return this.isNothing ? o(this) : f(this._v).map(Maybe.of)
    }
}