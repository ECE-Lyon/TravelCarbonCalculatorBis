// Chakra imports
import { Portal, Box, useDisclosure, Text, SimpleGrid} from "@chakra-ui/react";
import Footer from "components/footer/FooterAdmin.js";
import App from "App.js";
// Layout components
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import Itinerary from "Itinerary";

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };
  const { onOpen } = useDisclosure();
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }}>
        <Box color={'black'}
            fontSize='34px'
            fontWeight='700'
            lineHeight='0%'
            mx='auto'
            p={{ base: "20px"}}>
            Olalalo
        </Box>
        <Box>
          <App/>
        </Box>
        <Box>
          <Itinerary/>
        </Box>
        {getRoute() ? (
          <Box
            mx='auto'
            p={{ base: "20px"}}
            minH='80vh'>
            <Switch>
              {getRoutes(routes)}
              <Redirect from='/' to='/admin/default' />
            </Switch>
          </Box>
          ) : null}
          <Box>
            <Footer />
          </Box>
      </SimpleGrid>
    </Box>
  );
}