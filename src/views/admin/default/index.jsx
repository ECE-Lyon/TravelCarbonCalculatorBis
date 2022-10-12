import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";


export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "20px", md: "20px", xl: "20px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap='22px'>
        <TotalSpent />
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
    </Box>
  );
}