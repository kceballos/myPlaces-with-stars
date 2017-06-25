import React, { Component } from 'react';
import GMaps from './maps';
import SidebarRightOverlay from './sidebar';
import InputExampleFluid from './Input';
// import actions from '../actions'

const style = {
  marginTop: '-10px',
  fontFamily: 'helvetica',
}

const style2 = {
  paddingLeft: '25px',
  fontFamily: 'helvetica',
}

export default class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			// pos: {lat: 40.730610, lng: -73.935242 }
      userplaces: []
		}
	}

	componentDidMount(){
    this.props.dispatch('LOAD_PLACES')

		if (navigator.geolocation) {
          	navigator.geolocation.getCurrentPosition(function(position) {
        	this.setState({
        		pos: {
              	lat: position.coords.latitude,
              	lng: position.coords.longitude
            	}
        	})
		}.bind(this))
      }
  	}

    handlePlaceClick(place){ 
      console.log(place)
      this.props.dispatch('SAVE_PLACES', {place})
      this.setState({
        pos: {
          lat: place.lat,
          lng: place.lng,
        },

      })
    }



  render() {
      // console.log('APP PROPS', this.props);
      const PLACES = Object.values(this.props.PLACES || []);
      console.log(PLACES)
      const gmaps = <GMaps {...this.props} PLACES={PLACES} apiKey={"AIzaSyBACizJOC_KdP_vmNWSGsHprpJTRTQMfdg"} center={this.state.pos}>
       
      </GMaps>

      return (<div>
        <div>
        	<SidebarRightOverlay handlePlaceClick={this.handlePlaceClick.bind(this)} location={this.state.pos} {...this.props}>
				    {this.state.pos ? gmaps : null}
        	</SidebarRightOverlay>
        </div>
        <div>
          {PLACES.map(place => {
            // console.log(place)
            return <div style={style2} className="places_saved">
                   <h3>{place.name}</h3>
                   <h4 style={style}>{place.formatted_address}</h4>
                   <br />
                   </div>
                       
          })}
        </div>
      
      </div>)
  }
}

//AIzaSyAdHdePExLrWT5do9Y1bdQ72HIlSWpCOG0