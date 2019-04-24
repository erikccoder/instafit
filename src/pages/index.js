import React, {useState, useEffect, useRef} from 'react'
import domtoimage from 'dom-to-image';
import ClickNHold from 'react-click-n-hold';

import './index.css'
import DragZone from '../components/DragZone'

const MAX_IMG_WIDTH = 1080;

function readURL({target}, setURL) {


    if (target.files && target.files[0])
    {
        // var reader = new FileReader();
        //
        // reader.onload = function(e) {
        //     // $('#blah').attr('src', e.target.result);
        //     // console.log(reader.result)
        //     setURL(reader.result);
        // }
        //
        // reader.readAsDataURL(target.files[0]);
        var url = URL.createObjectURL(target.files[0]);
        setURL(url);
        window.gtag('event', 'browse_file', { name : target.files[0].name });
    }
}

function radioChange({target}, SetRatio){
    SetRatio(target.value);
    window.gtag('event', 'change_canvas_ratio', { value : target.value });

}

const RATIO = [
    {
        value: "square",
        label: "1:1"
    },
    {
        value: "four-five",
        label: "4:5"
    }
];


var DownloadCount = 0;
function onRednerOutput({nativeEvent}, {dzRef, setPreview, imgSize, scale})
{
    if(!dzRef.current){return;}

    const viewport = dzRef.current.getBoundingClientRect();
    const viewW = viewport.width;
    const viewH = viewport.height;


    const targetW = calcTargetW({imgSize, scale, viewport});
    const outScale = targetW / viewW;
    const offsetX = (targetW - viewW)*.5;
    const offsetY = (viewH*outScale - viewH)*.5;


    const cb = ()=>{
        domtoimage.toBlob(
            dzRef.current,
            {
                quality: 0.95,
                height: viewH*outScale, width:targetW,
                style:{
                    transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale3d(${outScale}, ${outScale}, ${outScale})`,
                }
            })
            .then(function (blob)
            {

                const blobUrl = URL.createObjectURL(blob);
                setPreview(blobUrl);
                // if(!DownloadCount){return;}
                // var link = document.createElement('a');
                // link.download = 'InstaFit-'+Date.now();
                // link.href = dataUrl;
                // link.target = "_blank";
                // link.click();

            });
    }
    if(!DownloadCount){cb(); DownloadCount++; }
    setTimeout(cb, 100);
    window.gtag('event', 'composite_image');
}

function calcTargetW({imgSize, scale, viewport})
{

    if(!imgSize || !imgSize.length){return -1;}

    const viewW = viewport.width;

    if(scale < 1.0)
    {
        return Math.min(imgSize[0], MAX_IMG_WIDTH);
    }
    else if(scale === 1.0)
    {
        return Math.min(
            Math.min(imgSize[0], viewW)/scale,
            MAX_IMG_WIDTH
        );
    }
    else
    {
        return Math.min(
            imgSize[0]/scale,
            MAX_IMG_WIDTH
        );
    }

}

function saveAsEvent(){
    window.gtag('event', 'save_image');
}


export default () =>
{
    const [url, setURL] = useState(null);
    const [ratio, SetRatio] = useState(null);
    const [preview, setPreview] = useState(null);
    const dzRef = useRef(null);
    const [dzProps, setDZProps] = useState();


    const sectionClass = "py-5 px-3 ";

    const step2Class = "pt-5 px-3 border " + ( ratio ? ("bg-light " + ratio) : " text-secondary not-allowed" );
    const step3Class = sectionClass + (url ? "" : "text-secondary not-allowed" );
    const step4Class = sectionClass + ' border ' + (preview ? "" : "text-secondary not-allowed" );

    // const step3BtnClass = "btn " + (preview ? "btn-primary text-white" : "btn-light")
    const step3BtnClass = "btn " + (url ? "btn-primary text-white" : "btn-light")
    const step4BtnClass = "btn " + (preview ? "btn-primary text-white" : "btn-light")


    const titleClass = "h4 m-0"

    // useEffect( _=> initPan(panZone, {setPos, pos, offset, setOffset}),[panZone]);
    useEffect( _=> setPreview(null),[dzProps,ratio]);

    const labels = RATIO.map( ({label, value}) => (
        <div className="form-check form-check-inline">
            <input className="mr-3" type="radio" name="canvas" value={value} id={value} onChange={e=>radioChange(e, SetRatio)} />
            <label className="input-group-text" htmlFor={value}>{label}</label>
        </div>
    ))

    return (
        <div>
            <section className={sectionClass}>
                <h3 className={titleClass}>1. Select the Canvas</h3>
                {labels}
            </section>

            <section className={step2Class}>
                <h3  className={titleClass + " m-0"}> 2. Select the Photo</h3>

                <div class="my-3 custom-file">
                    <input type="file" class="custom-file-input" id="file" accept="image/png, image/jpeg" onChange={ e =>readURL(e, setURL)} />
                    <label class="custom-file-label" htmlFor="file"></label>
                </div>
                <DragZone
                    dzRef={dzRef}
                    setDZProps={setDZProps}
                    url={url}
                />
            </section>


            <section className={step3Class}>
                <h3 className={titleClass}>
                    3.{' '}
                    <a className={step3BtnClass}
                        onClick={ e=> onRednerOutput(e, {dzRef, setPreview, ratio, ...dzProps})}
                    >
                        Render
                    </a>
                </h3>
            </section>

            <section className={step4Class}>
                <h3  className={titleClass}>
                    <ClickNHold
                        time={1.5}
                        onClickNHold={saveAsEvent}
                    >
                        <>
                            <a
                                role="button" className={step4BtnClass} href={preview} target="_blank" download={'InstaFit-'+Date.now()}
                                onContextMenu={saveAsEvent}
                                onClick={saveAsEvent}
                            >
                                4.{' '}  Right Click to Save the rendered image
                            </a>
                            <img className="w-100 mt-3" src={preview} alt="" onContextMenu={saveAsEvent} />
                        </>
                    </ClickNHold>
                </h3>
            </section>
        </div>
    )
}
