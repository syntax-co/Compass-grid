import { motion } from "framer-motion";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";



const SettingButton = ({open,setOpen}) => {
    
    const [hovering,setHovering] = useState(false);

    return (
        <motion.div className="w-24 h-24 rounded-br-full  absolute  
        z-10 left-0 top-0 border-white border-b-2 border-r-2
        pt-3 pl-3 cursor-pointer 
        "
        
        initial={{background:'#8D6B9488'}}
        animate={{
            background:hovering? '#8D6B94aa':'#8D6B9488'
        }}

        onMouseEnter={() => {setHovering(true)}}
        onMouseLeave={() => {setHovering(false)}}
        onClick={() => {setOpen(!open)}}
        >
            
            <motion.div className="w-fit "
            initial={{rotate:'0deg'}}
            animate={{
                rotate:hovering? '90deg':'0deg',
                transition:{
                    duration:.5
                }
            }}
            >
                <CiSettings 
                color="white"
                size={45}
                />
            </motion.div>

        </motion.div>
    );
}
 
export default SettingButton;