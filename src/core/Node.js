// @flow

import Morphism from './Morphism'

import { type ID } from '../types'

export default class Node {
    identity  : ID 
    morphisms : Morphism[] = []

    constructor (node : ID) {
        this.identity = node
    }
}