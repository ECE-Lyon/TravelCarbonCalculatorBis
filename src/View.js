import {
    Box,
    SimpleGrid,
  } from "@chakra-ui/react";
  import React from "react";
import PieCard from "views/components/PieCard";
import DailyTraffic from "views/components/DailyTraffic";
import WeeklyRevenue from "views/components/WeeklyRevenue";
  
  export default function View() {
    return (
      <Box pt={{ base: "20px", md: "20px", xl: "20px" }} ml='400px'>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='22px'>
          <DailyTraffic />
          <WeeklyRevenue />
          <PieCard />
        </SimpleGrid>
      </Box>
    );
  }