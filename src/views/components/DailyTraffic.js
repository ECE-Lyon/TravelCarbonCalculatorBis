import React from "react";

// Chakra imports
import { Box } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  barChartOptionsDailyTraffic2,
} from "variables/charts";

export default function DailyTraffic(props) {
  const { ...rest } = props;

  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
          chartOptions2={barChartOptionsDailyTraffic2}
        />
      </Box>
    </Card>
  );
}
