import React from 'react'
import PropTypes from 'prop-types'
import * as CS from 'constellation-sketcher';

export default class ConstellationSketcher extends React.Component {
    componentDidMount() {
        this.updateCS(this.props);
        this.start(this.props);
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateCS(this.props);
        if (this.props.slideshow !== prevProps.slideshow
                || this.props.constellation !== prevProps.constellation)
            this.start(this.props);
    }
    
    start(props) {
        if (props.constellation !== undefined)
            CS.setConstellation(props.constellation);
        else
            CS.chooseRandomConstellation();
        
        if (props.slideshow)
            CS.slideshow();
        else
            CS.sketch();
    }
    
    updateCS(props) {
        for (const prop in props) {
            if (!props.hasOwnProperty(prop)
                    || prop === "constellation"
                    || prop.startsWith("fadeIn")
                    || prop.startsWith("crossFade")
                    || prop === "width"
                    || prop === "height"
                    || prop === "slideshow"
                    || prop === "style"
                    || prop === "className"
                    || prop === "weights"
                    )
                continue
            if (props[prop] !== undefined) {
                const funcName = "set" + prop.charAt(0).toUpperCase() + prop.slice(1);
                CS[funcName](props[prop]);
            }
        }
        
        CS.setFadeIn(props.fadeIn, props.fadeInTime);
        CS.setCrossFade(props.crossFade, props.crossFadeTime);
        
        if (props.weights !== undefined) {
            if (props.weights.all !== undefined)
                CS.setSelectionWeightsAll(props.weights.all);
            if (props.weights.popular !== undefined)
                CS.setSelectionWeightPopular(props.weights.popular);
            if (props.weights.striking !== undefined)
                CS.setSelectionWeightStriking(props.weights.striking);
            if (props.weights.medium !== undefined)
                CS.setSelectionWeightMedium(props.weights.medium);
            if (props.weights.small !== undefined)
                CS.setSelectionWeightSmall(props.weights.small);
        }
    }
    
    componentWillUnmount() {
        CS.reset();
    }
    
    render() {
        return (
            <canvas
                id='constellation-sketcher'
                style={this.props.style}
                className={this.props.className}
                width={this.props.width || 500}
                height={this.props.height || 500}
          />
    )}
    
    static propTypes = {
        constellation: PropTypes.string,
        animated: PropTypes.bool,
        drawLines: PropTypes.bool,
        twinkle: PropTypes.bool,
        twinkleTimescale: PropTypes.number,
        twinkleAmplitude: PropTypes.number,
        speedScale: PropTypes.number,
        sizeScale: PropTypes.number,
        slideshow: PropTypes.bool,
        slideshowDwellTime: PropTypes.number,
        fadeIn: PropTypes.bool,
        crossFade: PropTypes.bool,
        fadeInTime: PropTypes.number,
        crossFadeTime: PropTypes.number,
        drawBeginCallback: PropTypes.func,
        drawFrameCompleteCallback: PropTypes.func,
        drawCompleteCallback: PropTypes.func,
        
        weights: PropTypes.objectOf(PropTypes.number),
        style: PropTypes.object,
        className: PropTypes.string,
    }
}

export const categories = CS.categories
export const constellationNames = CS.constellationNames
