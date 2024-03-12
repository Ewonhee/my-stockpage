// components/ExampleCarouselImage.js
'use client'


function ExampleCarouselImage({ src, alt }) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div> 
    );
}

export default ExampleCarouselImage;

  
  
