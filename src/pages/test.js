/**
 * Created by erik on 17/4/2019.
 */

import React, {useState, useEffect, useRef} from 'react'

import DragZone from '../components/DragZone'

export default function () {
    return (
        <div className="p-3">
            <DragZone url="https://reactjsexample.com/content/images/2017/08/Beautiful-accessible-drag-and-drop-for-lists-with-React.gif" />
        </div>
    )
};