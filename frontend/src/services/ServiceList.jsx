import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `
      Plan your travels with confidence as we forecast a perfect  sunshine and memorable adventures .`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `every destination with our seasoned tour guides and transforming your journey into  insight .`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `our customizable tours where every itinerary is crafted match your interests,adventure for you.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList