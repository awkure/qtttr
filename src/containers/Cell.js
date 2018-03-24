// @flow

import React from 'react';
import classNames from 'classnames';

import { type Props } from '../types'

export default function Cell (props : Props) : React$Element<string> {

    if (props.cMark != null) {

        return (
            <div className={'square classical'} onClick={props.onClick}>
                <div className="marks adjustCenter">
                    {props.cMark[0]}<sub>{props.cMark[1]}</sub>
                </div>
            </div>
        );
        
    } else {

        let cls = classNames('square', { 'selected': props.isBeingCollapsed })

        return (
            <div className={cls} onClick={props.onClick}>
                <div className="marks">
                    <QuantumMarks
                        {...props}
                    />
                </div>
            </div>
        );
    }
}

export function QuantumMarks (props : Props) {

    let spans;
    if (props.qMarks != null) {
        let marks = Array.from(props.qMarks.filter((x) => x != null));

        if (marks.length >= 1) {
            spans = Array.from(marks.slice(0, -1).map((m) => {

                const markCls = classNames("white",
                    { "blue": props.isHighlighted && props.cycleMarks.includes(m) },
                    { "red": props.isBeingCollapsed && props.cycleMarks.includes(m) })

                return <span className={markCls} key={m}>{m[0]}<sub>{m[1]}</sub>, </span>;
            }));

            const lastMark = marks[marks.length - 1];
            const markCls = classNames("white",
                { "blue": props.isHighlighted && props.cycleMarks.includes(lastMark) },
                { "red": props.isBeingCollapsed && props.cycleMarks.includes(lastMark) })

            spans.push(<span className={markCls} key={lastMark}>{lastMark[0]}<sub>{lastMark[1]}</sub></span>);
        }
    }
    return <div> {spans} </div>;
}
