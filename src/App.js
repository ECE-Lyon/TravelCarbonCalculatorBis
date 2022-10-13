import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  SkeletonText,
  Text,
  Image
} from '@chakra-ui/react'
import cross from "assets/img/cross/cross.svg";
import erase from "assets/img/erase/erase.svg"
import * as React from 'react';

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"",
    libraries: ['places'],
  })

  const google = window.google;  
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  const stop = useRef()

  const [isOpen, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || 
        destiantionRef.current.value === ''|| 
        stop.current.value === '') {
      return
    }
    
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
    //  waypoints: waypts,
      waypoints: [{location: stop.current.value, stopover: true}], 
      //new google.maps.LatLng(48.865277, 2.343025),
      optimizeWaypoints: true,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
  }

 /* function clearRoute() {
    setDirectionsResponse(null)
    originRef.current.value = ''
    destiantionRef.current.value = ''
    stop1.current.value = ''
  }  */

  return (
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
          {isOpen && 
            <HStack pl='20px' pt='10px'>
              <Autocomplete>
                <Input
                  width='264px'
                  type='text'
                  placeholder='Add a stop'
                  ref={stop}
                />
              </Autocomplete>
              <Button 
              p={0} 
              colorScheme='white'
              onClick={handleClose}>
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
          <Button 
            p={0} 
            pt='10px'
            colorScheme='white' 
            type='submit' 
            color='424A5C'
            onClick={handleOpen}>
              <Image src={cross} mr='10px' width='auto' height='auto'/>
              Add a stop
            </Button>
          </Box>
    </Flex>
  )
}

export default App