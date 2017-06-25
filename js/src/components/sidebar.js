import React, { Component } from 'react'
import { Sidebar, Segment, Input, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
var Autocomplete = require('google-places-browser/autocomplete')
var Places = require('google-places-browser/places')

var autocomplete = Autocomplete(google)
var places = Places(google)
  // console.log(places,"PLACES")
class SidebarRightOverlay extends Component {
  state = { 
    visible: true,
    places: []
  }

toggleVisibility = () => this.setState({ visible: !this.state.visible })

search = (e) => {
  let location = new google.maps.LatLng(this.props.location); 

  let options = {
    input: e.target.value, 
    location,
    radius: 20000   //in meters
  };
  if(e.which === 13) autocomplete.query(options, (err, results) => {
      console.log(results)
      const allResults = new Array(results.length);
      results.forEach((result, index) => {
        console.log('result', result)
        // console.log("HERE", result)
        if (!result.place_id) {
          allResults[index] = result;
          this.setState({
            places: allResults,
          });
        }
  else {
    places.details({placeId: result.place_id}, (err, myplace) => {
      allResults[index] = Object.assign({}, myplace, {
        lat: myplace.geometry.location.lat(), 
        lng: myplace.geometry.location.lng()
      });
      console.log('myplace', myplace.geometry.location.lat(), myplace.geometry.location.lng())
      this.setState({
        places: allResults,
      })

    })
      }


    })


      // this.setState({
      //   places: results
      // })
  })

}         

render() {
  const { visible, places } = this.state
    // console.log("SIDEBAR",this.state)
  return (
    <div>
      <Input onKeyDown={this.search} className="semantic-input" fluid icon='search' placeholder='Search...' />
        <Sidebar.Pushable as={Segment}>
         <Sidebar
          as={Menu}
          animation='overlay'
          width='wide'
          direction='right'
          visible={visible}
          icon='labeled'
          vertical
          inverted
        >
            
    {this.state.places.map((place, index)=>{
      if (index === 0) {
        return null;
      }
      // console.log(place)
      // console.log('PLACE',place.photos[0].getUrl({
      //   maxWidth: 200,
      //   maxHeight: 200,
      // }))
      const url = place.photos[0].getUrl({
        maxWidth: 200,
        maxHeight: 200,
      });
      return  <Menu.Item onClick={()=>this.props.handlePlaceClick(place)} key={index}>
                <div className="photos"><img className="picture" src={url} />
                <p> {place.formatted_address}</p></div>
              </Menu.Item>
    })}

          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'></Header>
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarRightOverlay
