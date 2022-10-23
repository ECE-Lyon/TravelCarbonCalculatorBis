// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
import App from "App.js";

// Layout components
import React from "react";
import View from "View";
import Itinerary from "Itinerary";

// Custom Chakra theme
export default function Dashboard() {
  return (
    <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }}>
      <Box color={'black'}
          fontSize='34px'
          fontWeight='700'
          lineHeight='0%'
          mx='auto'
          p={{ base: "20px"}}>
          Traject Carbon Calculator
      </Box>
      <Box>
        <App/>
      </Box>
      <Box>
        <View/>
      </Box>
      <Box>
        <Footer />
      </Box>
    </SimpleGrid>
  );
}