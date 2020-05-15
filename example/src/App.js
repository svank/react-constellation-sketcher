import React, {useState} from 'react'

import ConstellationSketcher from 'react-constellation-sketcher'
import * as CS from 'constellation-sketcher'

const App = () => {
    const [twinkle, setTwinkle] = useState(true);
    const [slideshow, setSlideshow] = useState(false);

    return (
        <div style={{textAlign: "center"}}>
            <h1 id="label" />
            <ConstellationSketcher
                width={500}
                height={500}
                speedScale={2}
                twinkle={twinkle}
                weights={{"all": 0, "small": 1, "striking": 1000}}
                slideshow={slideshow}
                style={{margin: "10px"}}
                className="demo-class"
                drawBeginCallback={() => {
                    document.getElementById("label").innerHTML = CS.getConstellation();
                }}
            />
            <div>
                <label>
                    Stars twinkle:
                    <input name="twinkle"
                           type="checkbox"
                           checked={twinkle}
                           onChange={() => setTwinkle(!twinkle)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Slideshow:
                    <input name="slideshow"
                           type="checkbox"
                           checked={slideshow}
                           onChange={() => setSlideshow(!slideshow)}
                    />
                </label>
            </div>
        </div>
    );
}

export default App
