import { useEffect } from "react"
import { useState, useRef } from "react"
import { Box, Text } from '@chakra-ui/react'

function Itinerary({distance})
{
    const [url, setUrl] = useState("https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km=")
    const [data, setData] = useState([])
   
    useEffect(() => {
        fetch(url+distance)
        .then((response) => response.json())
        .then((data) => { setData(data); 
        })
    }, [distance])

    return (
        <Box>
            <div>
            {
                data.map((item) => ( 
                <ol key = { item.id } >
                    { item.name }, gco2e: { item.emissions.gco2e }
                    </ol>
                ))
            }
            </div>         
        </Box>
    )
} 

export default Itinerary



