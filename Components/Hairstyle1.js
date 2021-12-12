import React, { useState } from 'react';
import { View, Image } from 'react-native';

var m1black = require('../assets/m1-black.png');
var m1grey = require('../assets/m1-grey.png');
var m1blonde = require('../assets/m1-blonde.png');
var m1brown = require('../assets/m1-brown.png');

const Mask = ({ face, color, model}) => {
  const [left, setleft] = useState();
  const [top, settop] = useState();
  const [path, setPath] = useState();
  const faces = {
    containerX: face && face[0]?.bounds?.origin?.x,
    containerY: face && face[0]?.bounds?.origin?.y,
    sizeWidth: face && face[0]?.bounds?.size?.width,
    sizeHeight: face && face[0]?.bounds?.size?.height,
    leftEyePosition: face && face[0]?.leftEyePosition,
    rightEyePosition: face && face[0]?.rightEyePosition,
    leftEarPosition: face && face[0]?.leftEarPosition,
    rightEarPosition: face && face[0]?.rightEarPosition,
    noseBasePosition: face && face[0]?.noseBasePosition,
  }

  //console.log("faces", faces)

  const glassesWidth = faces.sizeWidth + 15
  const glassesHeight = faces.sizeHeight / 2
  React.useEffect(() => {
    //if (model === 'm1') {
    if (color === 'black') {
      setPath(m1black);
    }
    if (color === 'grey') {
      setPath(m1grey);
    }
    if (color === 'blonde') {
      setPath(m1blonde);
    }
    if (color === 'brown') {
      setPath(m1brown);
    }
    // }
    // else if (model === 'm2') {
    //   if (color === 'black') {
    //     setPath(m2black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m2grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m2blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m2brown);
    //   }
    // }
    // else if (model === 'm3') {
    //   if (color === 'black') {
    //     setPath(m3black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m3grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m3blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m3brown);
    //   }
    // }
    // else if (model === 'm4') {
    //   if (color === 'black') {
    //     setPath(m4black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m4grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m4blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m4brown);
    //   }
    // }
    // else if (model === 'm5') {
    //   if (color === 'black') {
    //     setPath(m5black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m5grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m5blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m5brown);
    //   }
    // }
    // else if (model === 'm6') {
    //   if (color === 'black') {
    //     setPath(m6black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m6grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m6blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m6brown);
    //   }
    // }
    // else if (model === 'm7') {
    //   if (color === 'black') {
    //     setPath(m7black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m7grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m7blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m7brown);
    //   }
    // }
    // else if (model === 'm8') {
    //   if (color === 'black') {
    //     setPath(m8black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m8grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m8blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m8brown);
    //   }
    // }
    // else if (model === 'm9') {
    //   if (color === 'black') {
    //     setPath(m9black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m9grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m9blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m9brown);
    //   }
    // }
    // else if (model === 'm10') {
    //   if (color === 'black') {
    //     setPath(m10black);
    //   }
    //   if (color === 'grey') {
    //     setPath(m10grey);
    //   }
    //   if (color === 'blonde') {
    //     setPath(m10blonde);
    //   }
    //   if (color === 'brown') {
    //     setPath(m10brown);
    //   }
    // }

    if (face != undefined) {
      if (face[0] != undefined) {
        if (face[0].leftEarPosition != undefined && face[0].bottomMouthPosition != undefined) {
          setleft(face[0].rightEarPosition.x / 2)
          //setleft(Math.sqrt((Math.pow(face[0].leftEarPosition.x, 2) + Math.pow(face[0].leftEarPosition.y, 2)))/5);
          /*
          faces Object {
            "containerX": 79.80000000000001,
            "containerY": 304.56,
            "leftEarPosition": Object {
              "x": 248.94923400878906,
              "y": 463.42212280273435,
            },
            "leftEyePosition": Object {
              "x": 210.8302185058594,
              "y": 418.8926062011719,
            },
            "noseBasePosition": Object {
              "x": 179.33745117187502,
              "y": 463.53988098144526,
            },
            "rightEarPosition": Object {
              "x": 111.16499633789064,
              "y": 464.88476257324214,
            },
            "rightEyePosition": Object {
              "x": 146.58235473632814,
              "y": 420.6762768554687,
            },
            "sizeHeight": 310.2,
            "sizeWidth": 198,
          }*/
          //console.log(face[0].noseBasePosition.y)
          //console.log(face[0].containerY)
          console.log(face[0].noseBasePosition.y)
          //settop(face[0].sizeHeight)
          if (face[0].noseBasePosition.y <= 310) {
            settop(face[0].noseBasePosition.y - 210)
          }
          else if (face[0].noseBasePosition.y <= 340) {
            settop(face[0].noseBasePosition.y - 200)
          }
          else if (face[0].noseBasePosition.y <= 410) {
            settop(face[0].noseBasePosition.y - 250)
          }
          else if (face[0].noseBasePosition.y <= 510){
            settop(face[0].noseBasePosition.y - 190)
          }
          else if (face[0].noseBasePosition.y <= 610){
            settop(face[0].noseBasePosition.y - 150)
          }
          else{
            settop(face[0].noseBasePosition.y - 130)
          }
          
          //settop(Math.sqrt((Math.pow(face[0].rightEyePosition.x, 2) + Math.pow(face[0].rightEyePosition.y, 2)))/5);
          //console.log("left is "+ left);
          //console.log("top is "+ top);
        }
      }
    }
  }, [face]);

  const transformAngle = (
    angleRad = Math.atan(
      (faces.rightEarPosition.y - faces.leftEarPosition.y) /
      (faces.rightEarPosition.x - faces.leftEarPosition.x)
    )
  ) => angleRad * 180 / Math.PI

  return (
    <View style={(face && face[0] !== undefined) ? {
      position: 'absolute',
      // left: faces.noseBasePosition.y - glassesWidth * 1.73,
      // top: faces.leftEarPosition.y
      left,
      top
    } : null}>

      {(face && face[0] !== undefined) ?
        <>
          <Image
            source={path}
            style={{
              width: glassesWidth,
              height: glassesHeight,
              resizeMode: 'contain',
              transform: [{ rotate: `${transformAngle()}deg` }]
            }}
          />
        </>
        : null}

    </View>

    /* {   (face && face[0]!==undefined) ?  <View style = {{...eyeStyle(translatedLeftEyePosition)}} /> : <Text>Not face</Text> }
    {   (face && face[0]!==undefined) ?  <View style = {{position:'absolute', left:translatedLeftEyePosition.x,     
  borderColor: 'black',
  backgroundColor:'yellow'}} /> : <Text>Not face</Text> }
    {   (face && face[0]!==undefined) ?  <View style = { {...eyeStyle(translatedRightEyePosition)}} /> : <Text>Not face</Text> } */
    // const eyeWidth = faces.size ? faces.size/4 : 0
    // console.log("eyeWidth ", eyeWidth)
    // const translatedEyePositionX = (eyePosition) => {
    //     if(eyePosition!==undefined){
    //       return eyePosition.x - eyeWidth / 2 - faces.containerX
    //     }
    //     else {
    //       return 0
    //     }
    // }
    // const translatedEyePositionY = eyePosition => {
    //    if(eyePosition!==undefined){
    //       return eyePosition.y - eyeWidth / 2 - faces.containerY
    //    }
    //    else {
    //      return 0
    //    }
    //   }

    // const translatedLeftEyePosition = {
    //     x: translatedEyePositionX( faces?.leftEyePosition ),
    //     y: translatedEyePositionY( faces?.leftEyePosition)
    // }

    // console.log(translatedLeftEyePosition)


    // const translatedRightEyePosition = {
    //     x: translatedEyePositionX( faces?.rightEyePosition),
    //     y: translatedEyePositionY( faces?.rightEyePosition)
    // }
    //   const eyeStyle = (eyePosition, eyeBorderWidth = eyeWidth / 6) => ({
    //     position: 'absolute',
    //     left: eyePosition?.x,
    //     top: eyePosition?.y,
    //     borderRadius: eyeWidth,
    //     width: eyeWidth,
    //     height: eyeWidth,
    //     borderWidth: eyeBorderWidth,
    //     borderColor: 'black',
    //     backgroundColor:'yellow'
    //   });
  );
};

export default Mask;