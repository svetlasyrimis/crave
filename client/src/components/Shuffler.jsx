import React from 'react';
import CrossfadeImage from 'react-crossfade-image';





const Shuffler = (props) => {
  const { food, foodImage, drink, drinkImage } = props.data;
  return (
    <>
      <div className="container" >
       
          
          <div className="image-text">
          <CrossfadeImage src={foodImage}
              style={
              { maxWidth: "85%",maxHeight: "100%", borderRadius: "5%" }
            }
            
              timingFunction={"ease-in-out"}
              duration={800}
              alt="food" />
            <p>{food}</p></div>
         
            <div className="image-text">
           <CrossfadeImage src={drinkImage}
              style={{ maxWidth: "85%",maxHeight: "100%", borderRadius: "5%" }}
              className="picture"
              timingFunction={"ease-in-out"}
              duration={800}
              alt='dr' />
            <p>{drink}</p></div>
        
          
     </div>
     
    </>
  )
}

// const Shuffler = (props) => {
//   const { food, foodImage, drink, drinkImage } = props.data;
//   return (
//     <>
//       <Container >
//         <Row className="card1">
//           <div className="card1">
//           <Col xs={{ span: 3 }}>
//           <CrossfadeImage src={foodImage}
//               style={
//               { maxWidth: "100%", borderRadius: "20%" }
//             }
//               timingFunction={"ease-in-out"}
//               duration={800}
//               alt="food" />
//             <p>{food}</p>
//           </Col>
//           <Col xs={{ span: 3 }}>
//            <CrossfadeImage src={drinkImage}
//               style={{ maxWidth: "100%", borderRadius: "20%" }}
//               timingFunction={"ease-in-out"}
//               duration={800}
//               alt='dr' />
//             <p>{drink}</p>
//             </Col>
//             </div>
//         </Row>
//       </Container >
     
//     </>
//   )
// }

export default Shuffler