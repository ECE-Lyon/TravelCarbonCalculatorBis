import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  SkeletonText,
  Text,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'
import cross from "assets/img/cross/cross.svg";
import erase from "assets/img/erase/erase.svg"
import * as React from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState, useEffect } from 'react'
import Itinerary from 'Itinerary';
import View from 'View';
const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDBavBKAVdA09mux2GkPQtCq84i2i8ISIA',
    libraries: ['places'],
  })
  const google = window.google;  
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  const [distance, setDistance] = useState(0)

  const stop1 = useRef('null')
  const stop2 = useRef('null')
  const stop3 = useRef('null')
  const stop4 = useRef('null')
  const stop5 = useRef('null')
  const stop6 = useRef('null')
  const stop7 = useRef('null')
  const stop8 = useRef('null')
  const waypoint =  useRef([]) 
  
  const [isOpen1, setOpen1] = React.useState(false);
  const [isOpen2, setOpen2] = React.useState(false);
  const [isOpen3, setOpen3] = React.useState(false);
  const [isOpen4, setOpen4] = React.useState(false);
  const [isOpen5, setOpen5] = React.useState(false);
  const [isOpen6, setOpen6] = React.useState(false);
  const [isOpen7, setOpen7] = React.useState(false);
  const [isOpen8, setOpen8] = React.useState(false);
  const [num, setNum] = React.useState(0);
  const [val, setVal] = React.useState(0);


  const handleClose1 = () => {
    setOpen1(false); 
    setNum(num-1);
    deleteWaypoint(stop1.current.value);    
  };
  const handleClose2 = () => {
    setOpen2(false);
    setNum(num-1);
    deleteWaypoint(stop2.current.value); 
  };
  const handleClose3 = () => {
    setOpen3(false); 
    setNum(num-1);
    deleteWaypoint(stop3.current.value); 
  };
  const handleClose4 = () => {
    setOpen4(false);
    setNum(num-1);
    deleteWaypoint(stop4.current.value); 
  };
  const handleClose5 = () => {
    setOpen5(false); 
    setNum(num-1);
    deleteWaypoint(stop5.current.value); 
  };
  const handleClose6 = () => {
    setOpen6(false);
    setNum(num-1);
    deleteWaypoint(stop6.current.value); 
  };
  const handleClose7 = () => {
    setOpen7(false); 
    setNum(num-1);
    deleteWaypoint(stop7.current.value); 
  };
  const handleClose8 = () => {
    setOpen8(false);
    setNum(num-1);    
    deleteWaypoint(stop8.current.value); 
  };

  function handleOpen() {

    if(num<=7)
    {
      setNum(num+1); 
    }

    if(num===7)
    {
      setOpen8(true); 
    }
    else if(num===6)
    {
      setOpen7(true); 
    }
    else if(num===5)
    {
      setOpen6(true); 
    }
    else if(num===4)
    {
      setOpen5(true); 
    }
    else if(num===3)
    {
      setOpen4(true); 
    }
    else if(num===2)
    {
      setOpen3(true); 
    }
    else if(num===1)
    {
      setOpen2(true); 
    }
    
    setOpen1(true);
    document.getElementById("addValue").hidden = 'true'; 
  };

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
  /*  if (originRef.current.value === '' || 
        destiantionRef.current.value === ''|| 
        stop1.current.value === '' ||
        stop2.current.value === '' ||
        stop3.current.value === '' ||
        stop4.current.value === '' ||
        stop5.current.value === '' ||
        stop6.current.value === '' ||
        stop7.current.value === '' ||
        stop8.current.value === '') {
      return
    }*/
       
    if(num===1){
      setWaypoint({location: stop1.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===2){
      setWaypoint({location: stop2.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===3){
      setWaypoint({location: stop3.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===4){
      setWaypoint({location: stop4.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===5){
      setWaypoint({location: stop5.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===6){
      setWaypoint({location: stop6.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===7){
      setWaypoint({location: stop7.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }
    if(num===8){
      setWaypoint({location: stop8.current.value, stopover: true}); 
      document.getElementById("addValue").hidden = ''; 
    }

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      waypoints: waypoint.current,  
      //new google.maps.LatLng(48.865277, 2.343025),
      optimizeWaypoints: true,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })

      Distance(results); 

      setDirectionsResponse(results); 
  }


  function Distance(results){

      let updatedistance = []

      for(var i=0; i<results.routes[0].legs.length; i++)
      {
        if(results.routes[0].legs[0].distance.text.length > 6)
        {
          let num1 = results.routes[0].legs[i].distance.text.slice(0,1); 
          let num2 = results.routes[0].legs[i].distance.text.slice(2, results.routes[0].legs[i].distance.text.length-2);
          updatedistance.push(num1+num2)
        }
        else{
          updatedistance.push(results.routes[0].legs[i].distance.text.slice(0, results.routes[0].legs[i].distance.text.length-2))
        }
      }
      
      let total = 0; 
      for(var i=0; i<updatedistance.length; i++)
      {
        total = total + parseInt(updatedistance[i]); 
      }

      setDistance(total); 

  }


  function setWaypoint(el){
    if(val!==num)
    {
      waypoint.current.push(el);
      setVal(num); 
    }
    else{
      waypoint.current.slice(num); 
    }
  }

  function deleteWaypoint(el)
  {
    for(var i=0; i<waypoint.current.length; i++)
    {
      if(waypoint.current.at(i).location===el)
      {
        waypoint.current.splice(i, 1);
      }
    }
  }


  return (

    <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }}>
      <Box>
        <Flex
          position='relative'
          flexDirection='column'
          h='50vh'
          w='100vw'
          alignItems='flex-start' 
          >
          <Box position='absolute' left={0} top={0} h='100%' w='100%'>
            {/* Google Map Box */}
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                }}
                onLoad={map => setMap(map)}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
          <Box 
            width='350px' 
            p={2}
            borderRadius='lg'
            m={2}
            bgColor='white'
            shadow='base'
            zIndex='1'
            pl='16px'
            ml='16px'>
            <Box color={'black'}
              fontSize='20px'
              fontWeight='700'
              textAlign='center'
              pb='5px'
            >
              Calculate your trip 
            </Box>
            <HStack pl='20px' pt='10px'>
              <Autocomplete>
                <Input width='264px' type='text' placeholder='Origin' ref={originRef}/>
              </Autocomplete>
            </HStack>  
            {isOpen1 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop1}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose1}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen2 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop2}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose2}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen3 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop3}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose3}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen4 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop4}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose4}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen5 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop5}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose5}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen6 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop6}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose6}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen7 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop7}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose7}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            {isOpen8 && 
              <HStack pl='20px' pt='10px'>
                <Autocomplete>
                  <Input
                    width='264px'
                    type='text'
                    placeholder='Add a stop'
                    ref={stop8}
                  />
                </Autocomplete>
                <Button 
                p={0} 
                colorScheme='white'
                onClick={handleClose8}>
                <Image src={erase} mr='10px' width='25px' height='auto'/>
                </Button>
              </HStack>
            }
            <HStack pl='20px' pt='10px'>
              <Autocomplete>
                <Input
                  width='264px'
                  type='text'
                  placeholder='Destination'
                  ref={destiantionRef}
                />
              </Autocomplete>
            </HStack>
            <Box mt='10px' textAlign='center'>
              <Button colorScheme='green' type='submit' onClick={calculateRoute}>
                  Calculate Route
              </Button>
            </Box>
            <Button
              ml='20px'
              hidden='' 
              id='addValue'
              p={0} 
              pt='10px'
              colorScheme='white' 
              type='submit' 
              color='424A5C'
              onClick={handleOpen}>
              <Image src={cross} mr='10px' width='auto' height='auto'/>
                Add a stop
            </Button>
            <Text mt='10px'>Distance: {distance} </Text>
            <Box mt='10px'>
              <Itinerary distance={distance} />
            </Box>
          </Box>
          <Box>
            <Button onClick={() => setDistance(distance + 1)}>
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box>
        <View/>
      </Box>
    </SimpleGrid> 
  )
}

export default App

