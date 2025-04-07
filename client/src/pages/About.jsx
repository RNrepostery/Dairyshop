import React from 'react'
import DynamicMetaTag from '../components/DynamicMetaTag'

function About() {
  return (
   <>
    <DynamicMetaTag
        title="About Page"
        description="This is the Aboutpage of our website."
        author="Hitechnofy"
        keyword="React, SEO, Meta Tags"
      />
  <div className="row contactus ">
        <div className="col-md-6 ">
       
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
   </>
  )
}

export default About
