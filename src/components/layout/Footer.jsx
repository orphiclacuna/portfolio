import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
    const [time, setTime] = useState('')

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
            const offset = now.getTimezoneOffset()
            const offsetHours = Math.floor(Math.abs(offset) / 60)
            const offsetMinutes = Math.abs(offset) % 60
            const sign = offset <= 0 ? '+' : '-'
            const gmtString = `GMT${sign}${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}`
            setTime(`Local Time: ${timeString} ${gmtString}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <footer className="py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center">
                    <div className="text-sm text-text-muted pl-4">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span style={{ color: '#da3e87' }}>Local Time:</span><br />
                        {time.split(': ')[1]}
                    </div>
                    <div className="text-center text-sm text-text-muted">
                        &copy; {new Date().getFullYear()} Anushka. All rights reserved.
                    </div>
                    <div className="text-sm text-text-muted">
                        🎧 <span style={{ color: '#da3e87' }}>Currently obsessed with:</span><br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; End of Beginning.mp3
                    </div>
                </div>
            </div>
        </footer>
    )
}
