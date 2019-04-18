/**
 * Created by erik on 17/4/2019.
 */

import React, {useState, useEffect, useRef} from 'react';

import ColorPicker from './ColorPicker'

/*
function onMouseDown(e, {state, setState})
{
    const {offsetX, offsetY} = e.nativeEvent;

    setState({
        ...state,
        isDragging: true,
        dragX: offsetX,
        dragY: offsetY,
    })
}
function onMouseMove(e, {state, setState})
{
    const {isDragging, dragX, dragY} = state;
    const {offsetX, offsetY} = e.nativeEvent;

    // console.log("onMouseMove", isDragging, offsetX, offsetY)
    if(isDragging)
    {
        setState({
            ...state,
            offsetX: offsetX - dragX,
            offsetY: offsetY - dragY,
        })
    }
}
function onMouseUp(e, {state, setState})
{

    const {x, y, offsetX, offsetY} = state;
    setState({
        ...state,
        isDragging: false,
        dragX: 0,
        dragY: 0,
        offsetX: 0,
        offsetY: 0,
        x: x + offsetX,
        y: y + offsetY,
    })
}

function DragZone0({url}){

    if(!url){return null;}

    const [state, setState] = useState({
        isDragging: false,
        dragX: 0,
        dragY: 0,
        offsetX: 0,
        offsetY: 0,
        x:0,
        y:0
    });

    console.log(state);

    const {x, y, offsetX, offsetY} = state;

    const transform = {transform: `translate3d(${x+offsetX}px, ${y+offsetY}px, 0)`};
    // const imgClass = "img-preview " + (offset.x || offset.y ? "dragging" : "");
    const imgClass = "img-preview dragging";


    return (
        <div className="img-wrap">
            <img className ={imgClass} style={transform} src={url} alt="Preview" />
            <div id="pan-zone"
                 onMouseDown={e => onMouseDown(e, {state, setState} ) }
                 onMouseMove={ e=> onMouseMove(e, {state, setState} )}
                 onMouseUp={ e=> onMouseUp(e, {state, setState} )}

                 onTouchStart={ console.log}
            />
        </div>
    )
}
 */

/*
function onWheel(e){
    e.nativeEvent.preventDefault();
    e.preventBubble();
    return;
}

function DragZone({url})
{
    if(!url){return null;}
    const imgClass = "img-preview dragging";

    return (
        <div className="img-wrap" onWheel={onWheel}>
            <PinchZoomPan position="center" minScale={.3}>
                <img className ={imgClass} src={url} alt="Preview" />
            </PinchZoomPan>
        </div>
    )
}
*/


const POS = {x:0, y:0}


var VIEWPORT_CETNER = [0,0];
var IMG_CETNER = [0,0];
var LAST_POST = {...POS};
var LAST_SCALE = 1;

function initPan({current}, {setPos, setOffset, setScale, setLog})
{
    if(!current){return;}
    console.log("initPan")

    var hammertime = new Hammer(current);

    hammertime.get('pinch').set({ enable: true });

    hammertime.on('pinch pinchend', (e)=>{

        const {
            scale,
            isFinal,
            type
        } = e;

        const s = LAST_SCALE * scale;

        if(type === "pinchend"){
            LAST_SCALE = s;

        }
        else if(type === "pinch")
        {
            setScale(s);
        }

        setLog({
            LAST_SCALE,
            scale,
            s,
            type
        })

    });


    hammertime.on('pan', (e)=>{

        const {
            deltaX,
            deltaY,
            isFinal,
        } = e;

        // console.log(Object.keys(e));

        setOffset({x:deltaX, y: deltaY});

        if(isFinal)
        {
            LAST_POST.x = deltaX + LAST_POST.x;
            LAST_POST.y = deltaY + LAST_POST.y;

            setPos({...LAST_POST});
            setOffset({...POS})
        }

    });


    /*
    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = document.querySelector('.img-preview');

    hammertime.on('doubletap pan pinch panend pinchend', function(ev)
    {
        if (ev.type == "doubletap") {
            transform =
                "translate3d(0, 0, 0) " +
                "scale3d(2, 2, 1) ";
            scale = 2;
            last_scale = 2;
            try {
                if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                    transform =
                        "translate3d(0, 0, 0) " +
                        "scale3d(1, 1, 1) ";
                    scale = 1;
                    last_scale = 1;
                }
            } catch (err) {}
            el.style.webkitTransform = transform;
            transform = "";
        }

        //pan
        if (scale != 1)
        {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend")
        {
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1)
        {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform)
        {
            el.style.webkitTransform = transform;
            el.style.transform = transform;
        }
    });
    */

}

function onImgLoad({target}, setImgSize)
{
    const {width, height} = target;
    // console.log(width, height)
    setImgSize([width, height])
}


const png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
function DragZone({url, dzRef, setDZProps})
{
    // if(!url){return null;}

    const panRef = useRef(null);
    const [pos, setPos] = useState({...POS});
    const [offset, setOffset] = useState({...POS});
    const [scale, setScale] = useState(1);
    const [imgSize, setImgSize] = useState([]);
    // const [log, setLog] = useState();
    const [bgColor, setBgColor] = useState("#ffffff");


    useEffect(
        () => {

            let _pos = {...POS};
            let _scale = 1;
            if(panRef.current && imgSize.length)
            {
                const vp = panRef.current.getBoundingClientRect();

                VIEWPORT_CETNER = [vp.width*.5, vp.height*.5];
                IMG_CETNER = [imgSize[0]*.5, imgSize[1] * .5];

                //calc direction vector
                const dir = [
                    VIEWPORT_CETNER[0] - IMG_CETNER[0],
                    VIEWPORT_CETNER[1] - IMG_CETNER[1],
                ];

                _pos.x = dir[0];
                _pos.y = dir[1];

                //calc zoom scale
                const isVpNotFitImg = imgSize[0] > vp.width || imgSize[1] > vp.height;
                const isImgLandscape = imgSize[0] >= imgSize[1];

                if(isVpNotFitImg)
                {
                    _scale =  isImgLandscape ? ( vp.width / imgSize[0]) : ( vp.height / imgSize[1] );
                    // _scale *= 0.95;
                }
            }
            setPos({..._pos});
            setOffset({...POS});
            setScale(_scale);

            LAST_POST = {..._pos};
            LAST_SCALE = _scale;
        },
        [url, imgSize]
    )

    useEffect(
        ()=> {
            setDZProps({imgSize, scale});
        },
        [imgSize, scale, pos, url, panRef]
    );

    useEffect(
        ()=> initPan(panRef, {setPos, setOffset, setScale, setLog:console.log}),
        [panRef]
    )

    const x = offset.x + pos.x;
    const y = offset.y + pos.y;

    const imgClass = "img-preview " + (offset.y || offset.x ? "dragging":"");

    const style = {
        transform: `translate3d(${x}px, ${y}px, 0) scale3d(${scale}, ${scale}, ${scale})`,
    }

    return (
        <>
            <div className="img-wrap mx-auto" ref={dzRef} style={{backgroundColor: bgColor}}>
                <img onLoad={e => onImgLoad(e, setImgSize)} className ={imgClass} src={url||png} style={style} alt="Preview" />
                <div id="pan-zone" ref={panRef}></div>
            </div>
            <ColorPicker setBgColor={setBgColor} />
        </>
    )
}


export default DragZone