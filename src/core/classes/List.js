// @flow

const id = <T>(a : T) => a

export default class List<T> {
    _v : Array<T>

    constructor (xs : Array<T>) {
        this._v = xs
    }

    concat(x : T) : List<T> {
        return new List(this._v.concat(x))
    }

    static of (x : T) : List<T> {
        return new List([x])
    }

    map (f : Function) : List<$Call<Function, any>> {
        return new List(this._v.map(f))
    }

    sequence(o : List<Array<T>> => *) : T {
        return this.traverse(o, id)
    }

    traverse(o : List<Array<T>> => *, f : T => *) : T {
        return this._v.reduce((g : Function, a : T) => f(a).map((b : T) => (bs : Array<T>) => bs.concat(b)).ap(g), o(new List([])))
    }
}