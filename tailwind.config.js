export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {DEFAULT:'#0f001c',/* light:'#1a1625', */card:'#44318e'},
        accent: {cyan:'#3aafaa',pink:'#9b2c60',purple:'#664ad7',yellow:'#9b84c0'},
        text: {primary:'#ffffff',secondary:'#e0e0e0',muted:'#b0b0b0'},
        /* light: {bg:'#f8f5ff',secondary:'#ffffff',accent:'#3E1E68',pink:'#E45A92',purple:'#5D2F77',text:'#2a1a3d',textSecondary:'#5D2F77',textMuted:'#8a7a9d'} */
      },
      fontFamily: {
        display: ['Outfit','sans-serif'],
        body: ['Inter','sans-serif']
      },
      spacing: {
        xs:'0.5rem',sm:'1rem',md:'2rem',lg:'3rem',xl:'4rem','2xl':'6rem'
      },
      transitionDuration: {
        fast:'200ms',medium:'400ms',slow:'600ms'
      },
      transitionTimingFunction: {
        custom:'cubic-bezier(0.4,0.0,0.2,1)',
        bounce:'cubic-bezier(0.68,-0.55,0.265,1.55)'
      },
      keyframes: {
        fadeIn: {'0%':{opacity:'0'},'100%':{opacity:'1'}},
        fadeInUp: {'0%':{opacity:'0',transform:'translateY(30px)'},'100%':{opacity:'1',transform:'translateY(0)'}},
        float: {'0%,100%':{transform:'translate(0,0)'},'33%':{transform:'translate(30px,-30px)'},'66%':{transform:'translate(-20px,20px)'}},
        shimmer: {'0%':{transform:'translateX(-100%)'},'100%':{transform:'translateX(100%)'}},
        scrollDown: {'0%':{transform:'translate(-50%,0)',opacity:'0'},'40%':{opacity:'1'},'80%':{transform:'translate(-50%,12px)',opacity:'0'},'100%':{opacity:'0'}},
        spin: {'0%':{transform:'rotate(0deg)'},'100%':{transform:'rotate(360deg)'}},
        pulse: {'0%,100%':{transform:'scale(1)',boxShadow:'0 0 0 0 rgba(218,62,135,0.7)'},'50%':{transform:'scale(1.05)',boxShadow:'0 0 0 20px rgba(218,62,135,0)'}},
        particle: {'0%,100%':{transform:'translateY(0) translateX(0)'},'25%':{transform:'translateY(-20px) translateX(10px)'},'50%':{transform:'translateY(-10px) translateX(-10px)'},'75%':{transform:'translateY(-30px) translateX(5px)'}}
      },
      animation: {
        fadeIn:'fadeIn 1s ease-out',
        fadeInUp:'fadeInUp 1s ease-out',
        float:'float 20s ease-in-out infinite',
        shimmer:'shimmer 2s infinite',
        scrollDown:'scrollDown 2s ease-in-out infinite',
        spin:'spin 1s linear infinite',
        pulse:'pulse 2s ease-in-out infinite',
        particle:'particle 20s ease-in-out infinite'
      },
      backgroundImage: {
        'gradient-primary':'linear-gradient(135deg,#44318e,#da3e87)',
        'gradient-hero':'linear-gradient(135deg,#da3e87,#3aafaa)'
      }
    }
  },
  plugins: []
}
