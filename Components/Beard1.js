import React, { useState } from 'react';
import { View, Image } from 'react-native';

var beard = require('../assets/beard1.png');

const Mask = ({ face}) => {
  const [left, setleft] = useState();
  const [top, settop] = useState();
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

  const glassesWidth = faces.sizeWidth + 15
  const glassesHeight = faces.sizeHeight / 2
  React.useEffect(() => {
    
    if (face != undefined) {
      if (face[0] != undefined) {
        if (face[0].leftEarPosition != undefined && face[0].bottomMouthPosition != undefined) {
          setleft(face[0].rightEarPosition.x / 2)
          console.log(face[0].noseBasePosition.y)
          settop(face[0].noseBasePosition.y-50)
          //settop(face[0].sizeHeight)
          // if (face[0].noseBasePosition.y <= 310) {
          //   settop(face[0].noseBasePosition.y - 210)
          // }
          // else if (face[0].noseBasePosition.y <= 340) {
          //   settop(face[0].noseBasePosition.y - 200)
          // }
          // else if (face[0].noseBasePosition.y <= 410) {
          //   settop(face[0].noseBasePosition.y - 250)
          // }
          // else if (face[0].noseBasePosition.y <= 510){
          //   settop(face[0].noseBasePosition.y - 190)
          // }
          // else if (face[0].noseBasePosition.y <= 610){
          //   settop(face[0].noseBasePosition.y - 150)
          // }
          // else{
          //   settop(face[0].noseBasePosition.y - 130)
          // }
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
      left,
      top
    } : null}>

      {(face && face[0] !== undefined) ?
        <>
          <Image
            source={beard}
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
  );
};

export default Mask;