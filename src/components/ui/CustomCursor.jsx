import { useCursor } from '../../hooks/useCursor'
import { useEffect } from 'react'

export default function CustomCursor() {
    const { mousePos, cursorPos } = useCursor()
    const isTouchDevice = !window.matchMedia('(hover:hover) and (pointer:fine)').matches

    useEffect(() => {
        if (!isTouchDevice) {
            document.body.style.cursor = 'none'
            return () => {
                document.body.style.cursor = 'auto'
            }
        }
    }, [isTouchDevice])

    if (isTouchDevice) return null

    const dotStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        backgroundColor: '#da3e87',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${mousePos.x}px, ${mousePos.y - 4}px)`,
        boxShadow: '0 0 10px #da3e87'
    }

    const outlineStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        border: '2px solid #da3e87',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        transform: `translate(${cursorPos.x - 20}px, ${cursorPos.y - 20}px)`,
        transition: 'width 0.3s, height 0.3s'
    }

    return (
        <>
            <div style={dotStyle} />
            <div style={outlineStyle} />
        </>
    )
}
