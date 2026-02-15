import{useState,useEffect,useRef}from'react'
import{motion,AnimatePresence}from'framer-motion'

export default function LoadingScreen(){
const[loading,setLoading]=useState(true)
const[showFallback,setShowFallback]=useState(false)
const lottieContainer=useRef(null)
const animationRef=useRef(null)

useEffect(()=>{
if(lottieContainer.current&&window.lottie){
try{
animationRef.current=window.lottie.loadAnimation({
container:lottieContainer.current,
renderer:'svg',
loop:true,
autoplay:true,
path:'/telescope.json'
})
animationRef.current.addEventListener('data_failed',()=>{
setShowFallback(true)
})
}catch(error){
setShowFallback(true)
}
}else{
setShowFallback(true)
}
const timer=setTimeout(()=>setLoading(false),5000)
return()=>{
clearTimeout(timer)
if(animationRef.current){
animationRef.current.destroy()
}
}
},[])

return(
<AnimatePresence>
{loading&&(
<motion.div initial={{opacity:1}} exit={{opacity:1}} transition={{duration:0}} className="fixed inset-0 z-[10000] flex items-center justify-center bg-primary">
{/* Random Stars */}
{Array.from({length:100}).map((_,i)=>(
<motion.div
key={i}
className="absolute w-1 h-1 bg-white"
style={{
left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`,
transform:`rotate(${Math.random()*360}deg)`,
clipPath:'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
}}
animate={{
opacity: [0.2, 0.8, 0.2],
scale: [0.5, 1, 0.5]
}}
transition={{
duration: 1.5 + Math.random() * 2, // Random duration between 1.5-3.5 seconds
repeat: Infinity,
delay: Math.random() * 3, // Random start delay
ease: "easeInOut"
}}
/>
))}
<div className="flex flex-col items-center gap-4">
{showFallback?(
<>
<motion.div animate={{rotate:360}} transition={{repeat:Infinity,duration:2,ease:'linear'}} className="w-16 h-16 border-4 border-accent-pink/20 border-t-accent-pink rounded-full"/>
<p className="text-text-secondary text-sm font-medium">Looking for bugs...</p>
</>
):(
<>
<div ref={lottieContainer} style={{width:'100px',height:'100px'}}/>
<motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="text-text-secondary text-sm font-medium tracking-wide">
Looking for bugs...
</motion.p>
</>
)}
</div>
</motion.div>
)}
</AnimatePresence>
)
}
