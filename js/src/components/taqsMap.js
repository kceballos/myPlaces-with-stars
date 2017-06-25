import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const generateRandomFunc = (functionRoot, cb = function(){}) => {
	const functionName = `${functionRoot}_${Date.now()}`;
	window[functionName] = (overrideCb = null) => {
		delete window[functionName];
		if (overrideCb) {
			overrideCb();
			return;
		}
		cb();
	}
	return functionName;
};

const paramify = params => Object.keys(params)
	.map(key => [key, params[key]].join('='))
	.join('&');

const loadGMapScript = (url, params) => {
	return new Promise((resolve, reject) => {
		const functionName = generateRandomFunc('gmapsCallback', () => {
			resolve(true)
		});

		params = Object.assign({}, params, {
			callback: functionName
		});

		const script = document.createElement('script');
		script.onload = () => window[functionName];
		script.onerror = (e) => window[functionName](() => {
			reject(e);
		});
		script.type = 'text/javascript';
	    script.src = url + '?' + paramify(params);
	    document.body.appendChild( script );  
	});
}

const loadMap = (domNode, options = {}) => new google.maps.Map(domNode, Object.assign({
	zoom: 16,

}, options));

export default class GMaps extends Component {
	state = {
		mapLoaded: false,
		mapUrl: 'https://maps.googleapis.com/maps/api/js',
	}
	_wrapStyle = {
		position: 'relative',
		width : "100%",
        height : "600px",
	}
	_shimStyle = {
		position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 2,
        cursor: 'wait',
	}

	_loadMap(props) {
		const {mapUrl} = this.state;
		const {center, apiKey, radius} = props;
		loadGMapScript(mapUrl, {key: apiKey})
			.then(_ => this.map = loadMap(this.refs.map, {
				center,
			}))
			.then(_ => this.setState({
				mapLoaded: true,
			}))
	}

	_initShimLogic() {
        const root = ReactDOM.findDOMNode(this.refs.root);
        const node = ReactDOM.findDOMNode(this.refs.shim);
        let timeout = null;
        root.addEventListener('mouseenter', () => {
        	clearTimeout(timeout)
            timeout = setTimeout(() => {
                node.style.zIndex = -1;
                node.style.cursor = 'initial';
            }, 2000)
        });
        root.addEventListener('mouseleave', () => {
        	clearTimeout(timeout)
            node.style.zIndex = 2;
            node.style.cursor = 'wait';
        });		
	}

	componentDidMount() {
		this._loadMap(this.props);
		this._initShimLogic();
	}
	componentWillReceiveProps(nextProps) {
		// this._loadMap(nextProps)
		if (nextProps.center.lat !== this.props.center.lat) {
			this.map.setCenter(nextProps.center)
		}
	}
	render() {
		const {_wrapStyle, _shimStyle} = this;
		return (<div ref="root" style={_wrapStyle}>
            <div ref="shim" style={_shimStyle}></div>
            <div id="droneMap" ref="map" style={_wrapStyle}></div>
            {this.renderMarkers()}
        </div>);
	}
	renderMarkers() {
		const {mapLoaded} = this.state;
		if (!mapLoaded) return null;

		const {children} = this.props;
		const {Children, cloneElement} = React;
		return Children.map(children, (child) => cloneElement(child, {
			mapLoaded: true,
			map: this.map,
		}))
	}
}

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
		this._loadMarker(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this._loadMarker(nextProps)
	}
	render() {
		return null;
	}
}