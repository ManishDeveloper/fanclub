import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = ({customColor,customStyle}) => {
    return (
        <>
          <Spinner variant={customColor} style={customStyle} animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>  
        </>
    )
}

Loader.defaultProps = {
    customStyle:{width:'150px',height:'150px',display:'block',margin:'60px auto'}
}
export default Loader;
