import { motion } from "framer-motion";
import { useEffect, useState } from "react";




const Settings = ({
    showing, 
    setShowing,
    dims, 
    duration,
    length, 
    limit,
    updateValues}) => {

    // dims
    const [value1,setValue1] = useState(dims);
    const [value2,setValue2] = useState(duration);
    const [value3,setValue3] = useState(limit);
    const [value4,setValue4] = useState(length);

    const [mobile,setMobile] = useState(false);
    
    const checkMobile = () => {

        

        if (window.innerWidth <= 500) {
            setMobile(true);
        } else {
            if (mobile) {
                setMobile(false);
            }
        }

    }

    useEffect(() => {
        checkMobile()
    }, []);

    return (
        <motion.div className=" h-full rounded-r-lg 
        absolute top-0 z-[9] flex items-center justify-center
        sm:w-full
        md:w-1/3
        lg:w-1/3
        xl:w-1/3
        "

        style={{
            background:'linear-gradient(45deg, #397cc9,#78b7ff)'
        }}

        initial={{left: mobile? '-100%':'-34%'}}
        animate={{
            left:showing? '0%': mobile? '-100%':'-34%',
            duration: .5
        }}
        >

            <div className="w-5/6 h-5/6
            sm:w-full
            md:w-5/6
            lg:w-5/6
            xl:w-5/6
            "
            >

            {/* setting ideas */}
            {/* x count */}
            {/* ycount */}
            {/* degree restrictions */}
            {/* timing */}

            <div className="w-full h-1/6 flex justify-center"
            >

                <div className="w-fit flex items-center mx-3"
                >
                    <div className="text-white text-xl"
                    >
                    Width
                    </div>

                    <input id="setting-input" className="w-8 h-10 ml-2 rounded-md"
                    value={value1[0]}
                    type="number"
                    min={2}
                    max={20}
                    onChange={(event) => {
                        setValue1([event.target.value,value1[1]]);
                    }}
                    />
                </div>

                <div className="w-fit flex items-center mx-3"
                >
                    <div className="text-white text-xl"
                    >
                    Height
                    </div>
                    <input id="setting-input" className="w-8 h-10 ml-2 rounded-md"
                    value={value1[1]}
                    min={2}
                    max={20}
                    type="number"
                    onChange={(event) => {
                        setValue1([value1[0],event.target.value]);
                    }}
                    />
                </div>


            </div>

            
            <div className="w-full h-1/6 flex justify-center"
            >


                <div className="w-4/6 flex flex-col items-start"
                >
                    <div className="text-white text-xl flex"
                    >
                        Duration
                        <div className="p-1 ml-2 rounded-md bg-pompPowder"
                        >
                            {value2}
                        </div>
                    </div>
                    <input id="setting-input" className="w-full h-10 rounded-md"
                    type="range"
                    value={value2}
                    min={1}
                    max={value4}

                    onChange={(event) => {
                        setValue2(event.target.value);
                    }}
                    />
                </div>

            </div>


            <div className="w-full h-1/6 flex justify-center"
            >

                <div className="w-4/6 flex flex-col items-start"
                >
                    <div className="text-white text-xl flex"
                    >
                        Degree Interval 
                        <div className="p-1 ml-2 rounded-md bg-pompPowder"
                        >
                            {value3}
                        </div>
                    </div>

                    <div className="flex w-full text-white text-lg"
                    >
                        <div className="h-full flex items-center px-2"
                        >
                            0
                        </div>
                        <input id="setting-input" className="w-full h-10 rounded-md"
                        value={value3}
                        type="range"
                        min={0}
                        max={360}
                        step={45}
                        onChange={(event) => {
                            setValue3(event.target.value);
                        }}
                        />
                        <div className="h-full flex items-center px-2"
                        >
                            360
                        </div>
                    </div>
                    
                </div>

                

            </div>

            
            <div className="w-full h-1/6 flex justify-center"
            >


                <div className="w-4/6 flex flex-col items-start"
                >
                    <div className="text-white text-xl flex items-end"
                    >   
                        Animation <br />
                        Duration
                        <div className="h-10 p-1 ml-2 rounded-md bg-pompPowder"
                        >
                            {value4}
                        </div>
                    </div>
                    <input id="setting-input" className="w-full h-10 rounded-md"
                    type="range"
                    value={value4}
                    min={1}
                    max={7}

                    onChange={(event) => {
                        setValue4(event.target.value);

                        if (value2>parseInt(event.target.value)) {
                            setValue2(parseInt(event.target.value));
                        }
                    }}
                    />
                </div>

            </div>
            

            <div className="w-full h-20  flex items-center justify-center"
            >

                <div className="h-4/6 w-4/6 flex justify-end"
                >
                    <div className="w-fit h-full rounded-md flex items-center border px-6 border-white
                    cursor-pointer"
                    style={{
                        background:'linear-gradient(-45deg, #DB9065, #8D6B94)',
                    }}

                    onClick={() => {
                        updateValues();
                    }}
                    >
                        <div className="text-white text-2xl"
                        >
                            Save
                        </div>
                    </div>
                </div>
                

            </div>


            </div>


        </motion.div>
    );
}
 
export default Settings;