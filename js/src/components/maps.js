import React, { Component, PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';

const K_SIZE = 40;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #3f51b5',
  color: '#f44336'
};

const styles = {
	container: {
		width: '70vw',
		height: '500px',
		display: 'inline-block'
	}
}

const STAR = () => <img 
                      width={25} 
                      height={25} 
                      src={"http://site.consultai.com.br/app/%C3%ADcones/FAVORITOS%202.png"} 
                      />;

export class Marker extends Component {
  marker = null
  _loadMarker(props) {
    const {position, map, animation} = props;
    if (!map) return;
    if (this.marker) {
      this.marker.setMap(null)
    }
    this.marker = new google.maps.Marker({
            position,
            map,
            animation: google.maps.Animation[animation]
        });
  }
  componentDidMount() {
    this._loadMarker(this.props.pos);
  }

  render() {
    return null;
  }
}

export default class Gmaps extends Component {

  defaultProps = {
    center: this.props.center,
    zoom: 15
  };

  render() {
    return (
    	<div style={styles.container}>
	      <GoogleMapReact Marker={this.props.pos} center={this.props.center} defaultZoom={15} >
          {this.props.PLACES.map(place=>{
            return <STAR lat={place.lat} lng={place.lng}/>
          })}
        </GoogleMapReact>
      </div>
    );
  }
}