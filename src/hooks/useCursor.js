import { useState, useEffect } from 'react'

export function useCursor() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = e => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        let animationId
        const animate = () => {
            setCursorPos(prev => ({
                x: prev.x + (mousePos.x - prev.x) * 0.15,
                y: prev.y + (mousePos.y - prev.y) * 0.15
            }))
            animationId = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', handleMouseMove)
        animationId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationId)
        }
    }, [mousePos])

    return { mousePos, cursorPos }
}
