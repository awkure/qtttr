// @flow

import Morphism from './Morphism'
import Node from './Node'

import { type ID } from '../types'

export default class Graph {
    morphisms : { [key : string] : Morphism } = {}
    nodes : Node[] = []

    addNode (id : ID) {
        this.nodes[id] = new Node(id)
    }

    getNode (id : ID) : Node {
        return this.nodes[id] === undefined ? new Node(id) : this.nodes[id]
    }

    hasNode (id : ID) : boolean {
        return id in this.nodes
    }

    addMorphism (id1 : ID, id2 : ID, key : string) {
        if (!(id1 in this.nodes)) this.addNode(id1)
        if (!(id2 in this.nodes)) this.addNode(id2)

        let sMorphism = new Morphism(this.getNode(id1), this.getNode(id2), key)
        let rMorphism = new Morphism(this.getNode(id2), this.getNode(id1), key)

        this.getNode(id1).morphisms.push(sMorphism)
        this.getNode(id2).morphisms.push(rMorphism)

        this.morphisms[key] = sMorphism
    }

    numNodes () {
        return this.nodes.length
    }

    isCyclic (start : number) : bool {
        return Boolean(this.getCycle(start))
    }

    getCycle (id : ID) : * {

        if (this.numNodes() < 2)
            return [] 

        const start   : Node              = this.getNode(id)
        let visited   : Set<Node>         = new Set()
        let endToMorphism : Map<Node, Morphism> = new Map()

        for (const morphism of start.morphisms) {
            if (visited.has(morphism.end))
                return [ [morphism.start.identity, morphism.end.identity]
                       , [morphism.key, endToMorphism.get(morphism.end).key] ]

            visited.add(morphism.end)
            endToMorphism.set(morphism.end, morphism)
        }

        let q : Node[] = [start]
        let layers : * = new Map()
        let prev   : * = new Map()
        layers.set(start, 0)
        prev.set(start, null)

        while (q !== undefined && q.length > 0) {

            const curr  : * = q.shift()
            const layer : * = layers.get(curr)

            for (let morphism of curr.morphisms) {

                if (layers.has(morphism.end)) {
                    if (layer !== undefined && layers.get(morphism.end) === layer - 1)
                        continue
                    else 
                        return this._constructPath(morphism, prev)
                }

                q.push(morphism.end)
                layers.set(morphism.end, layer + 1)
                prev.set(morphism.end, morphism)
            }
        }

    }

    _constructPath(morphism : Morphism, prev : *) /*:: : *[] */ {
        let cycleNodeIDs  : Array<number> = []
        let cycleMorphismKeys : Array<string> = [morphism.key]
        let currNode : Node , currMorphism : Morphism

        currNode = morphism.start
        
        while (prev.get(currNode)) {
            currMorphism = prev.get(currNode)
            cycleNodeIDs.push(currNode.identity)
            cycleMorphismKeys.push(currMorphism.key)
            currNode = currMorphism.start
        }

        cycleNodeIDs.push(currNode.identity) 

        currNode = morphism.end

        while (prev.get(currNode)) {
            currMorphism = prev.get(currNode)
            
            cycleNodeIDs.unshift(currNode.identity)
            cycleMorphismKeys.unshift(currMorphism.key)

            currNode = currMorphism.start
        }

        return [cycleNodeIDs, cycleMorphismKeys]
    }
}