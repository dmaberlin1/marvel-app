import React from 'react';
import errorImg from '../../resources/img/error.gif'
// <img alt={process.env.PUBLIC_URL+'/error.gif'} src={}/>

const ErrorMessage = () => {
    return (
      // <img alt={process.env.PUBLIC_URL+'/error.gif'} src={}/>
      <img draggable='false'  style={{display:'block',width:'250px',height:'250px',objectFit:'contain',margin:'0 auto'}}
        src={errorImg} alt="errorImg"/>
    );
};

export default ErrorMessage;
