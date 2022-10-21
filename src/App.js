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
  const [duration, setDuration] = useState('')
  const stop1 = useRef()
  const stop2 = useRef()
  const stop3 = useRef()
  const stop4 = useRef()
  const stop5 = useRef()
  const stop6 = useRef()
  const stop7 = useRef()
  const stop8 = useRef()

  const [isOpen1, setOpen1] = React.useState(false);
  const [isOpen2, setOpen2] = React.useState(false);
  const [isOpen3, setOpen3] = React.useState(false);
  const [isOpen4, setOpen4] = React.useState(false);
  const [isOpen5, setOpen5] = React.useState(false);
  const [isOpen6, setOpen6] = React.useState(false);
  const [isOpen7, setOpen7] = React.useState(false);
  const [isOpen8, setOpen8] = React.useState(false);
  const [num, setNum] = React.useState(0);

  const handleClose1 = () => {
    setOpen1(false); 
    setNum(num-1);
  };
  const handleClose2 = () => {
    setOpen2(false);
    setNum(num-1);
  };
  const handleClose3 = () => {
    setOpen3(false); 
    setNum(num-1);
  };
  const handleClose4 = () => {
    setOpen4(false);
    setNum(num-1);
  };
  const handleClose5 = () => {
    setOpen5(false); 
    setNum(num-1);
  };
  const handleClose6 = () => {
    setOpen6(false);
    setNum(num-1);
  };
  const handleClose7 = () => {
    setOpen7(false); 
    setNum(num-1);
  };
  const handleClose8 = () => {
    setOpen8(false);
    setNum(num-1);
  };

  function handleOpen() {
    if(num<=7)
    {
      setNum(num+1); 
    }

    setOpen1(true);

    if(num==7)
    {
      setOpen8(true); 
    }
    else if(num==6)
    {
      setOpen7(true); 
    }
    else if(num==5)
    {
      setOpen6(true); 
    }
    else if(num==4)
    {
      setOpen5(true); 
    }
    else if(num==3)
    {
      setOpen4(true); 
    }
    else if(num==2)
    {
      setOpen3(true); 
    }
    else if(num==1)
    {
      setOpen2(true); 
    }
  };

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || 
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
    }
    
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
    //  waypoints: waypts,
      waypoints: [{location: stop1.current.value, stopover: true}, 
        {location: stop2.current.value, stopover: true},
        {location: stop3.current.value, stopover: true},
        {location: stop4.current.value, stopover: true},
        {location: stop5.current.value, stopover: true},
        {location: stop6.current.value, stopover: true},
        {location: stop7.current.value, stopover: true},
        {location: stop8.current.value, stopover: true}], 
      //new google.maps.LatLng(48.865277, 2.343025),
      optimizeWaypoints: true,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDuration(results.routes[0].legs[0].duration.text)
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
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
            />
          </ButtonGroup>
          <Text>Duration: {duration} </Text>
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