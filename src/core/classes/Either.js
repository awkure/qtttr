// @flow

import { compose } from 'rambda'

const id = <T>(a : T) => a

export default class Either<T> {
    _v : T 

    constructor (x : T) {
        this._v = x
    }

    static of (x : T) : Right<T> {
        return new Right(x)
    }
}

export class Left<T> extends Either<T> {
    get isLeft () : boolean {
        return true
    }

    get isRight () : boolean {
        return false
    }

    map () : Left<T> {
        return this
    }

    ap () : Left<T> {
        return this
    }

    chain () : Left<T> {
        return this
    }

    join () : Left<T> {
        return this
    }

    sequence (f : Left<T> => T) : T {
        return f(this)
    }

    traverse(f : Left<T> => T, g : Function) : T {
        return f(this)
    }
}

export class Right<T> extends Either<T> {
    _v : *

    get isLeft () : boolean {
        return false
    }

    get isRight () : boolean {
        return true
    }

    map (f : T => T) : Either<T> {
        return compose(Either.of, f)(this._v)
    }

    ap (a : Right<T>) : Either<T> {
        return a.map(this._v)
    }

    chain (f : Function) : T {
        return f(this._v)
    }

    join () : T {
        return this._v 
    }

    sequence (o : *) {
        return this.traverse(o, id)
    }

    traverse(o : *, f : Function) {
        f(this._v).map(Either.of)
    }
}