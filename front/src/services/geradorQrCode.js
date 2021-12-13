import React, { useRef, useEffect } from 'react'
import QrCode from 'qr-image'
import qr from 'qrcode'

function QrCodeGerador ({text}) {

    const CanvasRef = useRef()
  
 //   console.log(text)
    useEffect(() => {
        qr.toCanvas(CanvasRef.current,text,{width: 250, margin: 1}, (error)=>
        {
            // console.log(error)
        })
    }, [text])

    return (
        <div className='text-center'>
            <canvas className='mx-auto' ref={CanvasRef} id="canvas"></canvas>
        </div>
    )
}

export default QrCodeGerador;