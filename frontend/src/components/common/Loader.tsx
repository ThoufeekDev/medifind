import "../../styles/globals.css"
import { motion }
from "framer-motion";

export default function Loader(){

    return (

        <div className="loader-container">

            <motion.div

                className="loader-circle"

                animate={{

                    scale:[1,1.2,1],

                    opacity:[0.5,1,0.5],
                }}

                transition={{

                    duration:1,

                    repeat:Infinity,
                }}
            />
        </div>
    )
}