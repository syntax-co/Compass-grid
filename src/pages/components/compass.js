import { motion } from "framer-motion";
import { useEffect } from "react";





const Compass = ({size,rotation,duration}) => {
    
    
    return(
      <motion.div className="flex items-center justify-center"
      style={{
        width:size+'px',
        height:size+'px'
      }}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      >
  
        <motion.div className="w-[95%] h-2 rounded-full bg-white"
        initial={{
          rotateX:0+'deg',
        }}
        animate={{
          rotateZ:rotation? rotation+'deg':'0deg',
          transition:{
            duration:duration,
            ease:'easeInOut',
            type:'spring'
          }
        }}
        >
  
        </motion.div>
  
      </motion.div>
    )
  }
 
export default Compass;
