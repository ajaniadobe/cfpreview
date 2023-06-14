import React, { useEffect, useState } from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import CFBanner1920x390 from './CFBanner1920x390'
import CFBanner1300x435 from './CFBanner1300x435'
import CFApp from './CFApp'

export default function Home() {

  const aemauthorurl = 'https://author-p55117-e571178.adobeaemcloud.com';
    
  const defaultcontent = {
    "headline": "Earn Great Rewards",
    "pretitle": "While Spending Money",
    "detail": {
      "plaintext": "Start Today"
    },
    "callToAction": "Find Out More now!",
    "heroImage": {
      "_publishUrl": "https://publish-p55117-e571178.adobeaemcloud.com/content/dam/securbank/en/stock/cards---payment/AdobeStock_414939518.jpeg",
      "_dynamicUrl": "/adobe/dynamicmedia/deliver/dm-aid--778b54be-e653-4409-9b82-e39342f47252/AdobeStock_414939518.jpg"
    }
  }

  const [state,setState] = useState({contentfragment: defaultcontent})

  const getContentFragment = () => {
    let options = {};
    const persistedquery = `/graphql/execute.json/securbank/OfferByPath;path=${cf};ts=${Math.random()*1000}`;
    let url = aemauthorurl + persistedquery
    console.log(url);
    options = {credentials: "include"};   
    
    try {
      const cfReq = fetch(url+"?ts="+Math.random()*1000, options)
      .then((response) => response.json())
      .then((contentfragment) => {
          if(contentfragment.data) {
              console.log(contentfragment.data.offerByPath.item);
              let content = contentfragment.data.offerByPath.item;
              setState({contentfragment: content});
              return content;
          } else {
              console.log("no data");
          }
      });
    } catch (error) {
      console.log(error);
    }

  }

  const cfpath = new URLSearchParams(document.location.search)
  const cf = cfpath.get('cf')
  console.log('Content Fragment Path: ', cf)

  useEffect(() => {
    getContentFragment();
  }, [])

  return (
    <View>
      <Heading level={1}>Welcome to Content Preview!</Heading>
      <Heading level={4}>Content Fragment path: {cf}</Heading> 
      <Heading level={4}>Content Fragment path: {state.contentfragment.detail.plaintext}</Heading> 
      <CFBanner1920x390 contentfragment={state.contentfragment} label="Banner Ad 1920 x 390" aemauthorurl={aemauthorurl}></CFBanner1920x390>
      <CFBanner1300x435 contentfragment={state.contentfragment} label="Banner Ad 1300 x 435" aemauthorurl={aemauthorurl}></CFBanner1300x435>
      
    </View>
  );

}


 