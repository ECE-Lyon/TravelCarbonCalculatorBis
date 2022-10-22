
import React from "react";
import App from "App";

class Itinerary extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false,
            mode: 'no-cors'
        };
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch("https://api.monimpacttransport.fr/beta/getEmissionsPerDistance?km="+250)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div> ;
   
        return (
        <div>
            {
                items.map((item) => ( 
                <ol key = { item.id } >
                    name: { item.name },  
                    gco2e: { item.emissions.gco2e }
                    </ol>
                ))
            }
        </div>
    );
}
}
   
export default Itinerary;