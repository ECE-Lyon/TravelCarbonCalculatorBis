import { useEffect } from "react"
import { useState, useRef } from "react"
import { Box, Text } from '@chakra-ui/react'

function Itinerary({distance})
{
    const [url, setUrl] = useState("https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=")
   // const [dist, setDist] = useState({distance})
    const [data, setData] = useState([])

    /*const str = ''; 
    str = dist.distance;  
    const subStr = str.substring(0, str.length-3)*/
   // const str = parseInt(dist.distance)
    
    useEffect(() => {
        fetch(url+distance)
        .then((response) => response.json())
        .then((data) => { setData(data); 
            console.log('Count is now: ', data);
            console.log(distance)
        })
    }, [distance])

    return (
        <Box>
            <div>
            {
                data.map((item) => ( 
                <ol key = { item.id } >
                    name: { item.name },  
                    gco2e: { item.emissions.gco2e }
                    </ol>
                ))
            }
            </div>         
        </Box>
    )
} 

export default Itinerary



