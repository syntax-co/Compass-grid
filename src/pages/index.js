import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react"
import Compass from "./components/compass";
import SettingButton from "./components/setting-button";
import Settings from "./components/settings";
import { compress } from "../../next.config";






export default function Home() {



  // dimensions of full grid
  const [dims,setDims] = useState([16,10])
  // compass object data
  const [compi,setCompi] = useState([]);
  const _compi = useRef([]);


  // compass size 
  const [_size,setSize] = useState(0);
  const [limit,setLimit] = useState(45);
  const [duration,setDuration] = useState(3)
  const [showSettings,setShowSettings] = useState(false);
  const [mount,setMount] = useState(true);
  const [time,setTime] = useState(5);
  
  // [compi,playing]
  const flags = useRef([0,1,0,0]);
  const timeout = useRef(null);
  const maxTime = 5;


  const updateValues = () => {

    stopAnimation();
    setShowSettings();
    const values = document.querySelectorAll("#setting-input");

    const newDims = [parseInt(values[0].value),parseInt(values[1].value)];
    const newDuration = parseInt(values[2].value);
    const newLimit = parseInt(values[3].value);
    const newTime = parseInt(values[4].value); 

    setMount(false);
    changeFlag(2,1);

    setTimeout(() => {

      setDims(newDims);
      setDuration(newDuration);

      setTime(newTime)

      if (newDuration>time) {
        setDuration(time);
      } else {
        setDuration(newDuration);
      }

      if (newLimit == 0) {
          setLimit(1);
      } else {
          setLimit(newLimit);
      } 
    }, 700);



    setTimeout(() => {
      changeFlag(3,1);
      setMount(true);
    }, 1000);

  }


  const changeFlag = (dex,newValue) => {

    const clone = flags.current.splice(0);
    clone[dex] = newValue;
    flags.current = clone;
  }


  const checkRatio = () => {

    const width = window.innerWidth;
    const height = window.innerHeight;
    var holder = [dims[0],dims[1]];

    
    
    // if browser view
    if (width>height) {
      if (dims[0]<dims[1]) { 
        holder = [dims[1],dims[0]]
      }
    } 
    // if mobile view
    else {
      if (dims[1]<dims[0]) {
        holder = [dims[1],dims[0]]
      }
    }

    
    setDims(holder);
    return holder;
  }


  const generateMatrix = () => { 
    const newDims = checkRatio();

    const holder = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    var size = height/newDims[1];

    console.log(width,height,size,newDims);

    if (size*newDims[0] >= width) {
      size = width/newDims[0];
    } 
    
    setSize(size);  
  
    // console.log(size);

    for (var i=0; i<newDims[1]; i++) { 
      const row = [];
      for (var k=0; k<newDims[0]; k++) {

        row.push(
          {
            size:size,
            rotation:(Math.ceil(Math.random()*(360/limit))*limit ),
            duration:(Math.random()+duration)
          }
        )
      }

      holder.push(row);
    }

    changeFlag(0,1);
    _compi.current = holder;
    setCompi(holder);
  }



  const randomize = () => {
    // console.log('hit')
    const compClone = _compi.current.splice(0);

    

    for (var i=0; i<compClone.length; i++) {
      for (var k=0; k<compClone[0].length; k++) {
        compClone[i][k].rotation = (Math.ceil(Math.random()*(360/limit))*limit );
      }
    }

    changeFlag(0,1);
    _compi.current = compClone; 
    setCompi(compClone);
  }


  const startAnimation = () => {
    flags.current[1] = 1;
    
    randomize();
  }

  const stopAnimation = () => {
    flags.current[1] = 0;
    clearTimeout(timeout.current);
  }


  
  // using a binary array to hold
  // flags to control these useEffects
  // so that they only perfom when allowed


  useEffect(() => {
    if (mount && flags.current[3]) {
      startAnimation();
      changeFlag(3,0);
    }
  }, [mount]); 

  useEffect(() => {
    if (flags.current[2]) {
      generateMatrix();
      changeFlag(2,0)
    }
  }, [dims]);


  useEffect(() => {

    if (flags.current[0] && flags.current[1]) {
      
      timeout.current = setTimeout(() => {
        // console.log('hit cycle')
        randomize();
      }, time*1000); 
      
      changeFlag(0,0);
    }

  }, [compi]);




  useEffect(() => {
    generateMatrix();

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current); 
      }
    }
  }, []);



  return (
    <div className='h-screen w-full flex items-center justify-center relative'
    style={{
      
    }}
    >

      <SettingButton 
      open={showSettings}
      setOpen={setShowSettings}
      />

      <Settings
      showing={showSettings}
      setShowing={setShowSettings}
      dims={dims}
      setMount={setMount}
      length={time}
      duration={duration}
      setDuration={setDuration}
      limit={limit}
      updateValues={updateValues}
      />


      {/* <div className="w-20 h-20 rounded-full bg-persianOrange z-40 
       absolute top-0 right-0 m-3"
      onClick={() => {
        // randomize();
      }}
      >

      </div> */}

      <div className="grid place-items-center"
      style={{
        // width:_size * dims[0],
        height:_size * dims[1],
        gridTemplateColumns: `repeat(${dims[0]}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${dims[1]}, minmax(0, 1fr))`,
      }}
      >

        <AnimatePresence >
          {
            (compi&&mount) &&
            compi.map(
              (item,dex) => {
                return item.map(
                  (_item,_dex) => {
                    return (
                      <Compass key = {['compi',dex,_dex].join('-')}
                      size={_item.size}
                      rotation={_item.rotation}
                      duration={_item.duration}
                      />
                    )
                  }
                )
              }
            )
          }
        </AnimatePresence>
      </div>


    </div>
  )
}
