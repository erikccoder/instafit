/**
 * Created by erik on 18/4/2019.
 */

import React from 'react';
import _ from 'lodash'

const COLORS = _.sortBy([
    "#000000",
    "#ffffff",
    "#c600ff",
    "#4fe3c1",
    "#25d3ff",
    "#f5c7c7",
    "#c191e5",
    "#4890e4",
    "#e2013a",
])

export default function ({setBgColor})
{
    const colors = COLORS.map( c => (
        <li
            className="list-inline-item p-4 rounded"
            style={{backgroundColor: c}}
            onClick={e => {
                setBgColor(c);
                window.gtag('event', 'select_color', { color : c });
            }}
        />
    ) );
    return (
        <ul className="list-inline py-2 m-0">
            {colors}
        </ul>
    )
}