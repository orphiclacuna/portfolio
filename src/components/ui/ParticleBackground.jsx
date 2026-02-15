import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []
        let mouse = { x: -9999, y: -9999 }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1 + 1
                this.speedX = (Math.random() - 0.5) * 0.2
                this.speedY = (Math.random() - 0.5) * 0.2
                this.opacity = Math.random() * 0.1 + 0.9
                this.twinkleSpeed = Math.random() * 0.02 + 0.01
                this.twinkleDirection = Math.random() > 0.5 ? 1 : -1
            }

            update() {
                const dx = this.x - mouse.x
                const dy = this.y - mouse.y
                const distance = Math.hypot(dx, dy)
                if (distance < 200) {
                    const force = (200 - distance) / 200
                    this.x += (dx / (distance || 1)) * force * 2.2
                    this.y += (dy / (distance || 1)) * force * 2.2
                }
                this.x += this.speedX
                this.y += this.speedY

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

                this.opacity += this.twinkleSpeed * this.twinkleDirection
                if (this.opacity >= 1 || this.opacity <= 0.7) {
                    this.twinkleDirection *= -1
                    this.opacity = Math.max(0.7, Math.min(1, this.opacity))
                }
            }

            draw() {
                ctx.shadowBlur = 4
                ctx.shadowColor = `rgba(255,255,255,${this.opacity * 0.8})`
                ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.shadowBlur = 0
            }
        }

        const init = () => {
            particles = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4500)
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        resizeCanvas()
        init()
        animate()

        const handleResize = () => {
            resizeCanvas()
            init()
        }

        const handleMouseMove = event => {
            mouse = { x: event.clientX, y: event.clientY }
        }

        const handleMouseLeave = () => {
            mouse = { x: -9999, y: -9999 }
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: 'transparent' }} />
    )
}
