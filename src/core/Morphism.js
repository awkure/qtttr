// @flow 

import Node from './Node'

export default class Morphism {
    start : Node
    end   : Node 
    key   : string

    constructor (node1 : Node, node2 : Node, key : string) {
        this.start = node1
        this.end   = node2
        this.key   = key 
    }
}