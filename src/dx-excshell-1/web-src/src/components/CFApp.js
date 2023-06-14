import React from 'react'


export default function CFApp({ contentfragment, label, aemauthorurl}) {

  console.log('Content Fragment App Headline: ', contentfragment.headline)

  const imagepath = aemauthorurl + contentfragment.heroImage._dynamicUrl;

  return (
    <div>
    <h1>{label}</h1>
    <div className='banner-content'>
      <div className='banner-pic'>
      <img 
          loading="lazy" alt="" type="image/jpeg" 
          src={imagepath} 
          width="1600" height="634"></img>
      </div>
      <div className='banner-text'>
        <h3>{contentfragment.pretitle}</h3>
        <h1>{contentfragment.headline}</h1>
        <p>{contentfragment.detail.plaintext}</p>
        <p>{contentfragment.callToAction}</p>
      </div>
    </div>
    </div>
  );

}