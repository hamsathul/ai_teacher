"use client"

import { CameraControls, Environment, Gltf, Html, useGLTF, Float } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {useRef, useEffect} from 'react'
import Teacher from './Teacher'
import TypingBox from './TypingBox'
import MessagesList from './MessagesList'
import { degToRad } from 'three/src/math/MathUtils'
import BoardSettings from './BoardSettings'
import { useControls, button, Leva } from 'leva'
import { useAITeacher } from '@/hooks/useAITeacher'
import { Suspense } from 'react'


const itemPlacement = {
	default: {
	  classroom: {
		position: [0.2, -1.7, -2],
	  },
	  teacher: {
		position: [-1, -1.7, -3],
	  },
	  board: {
		position: [0.45, 0.382, -6],
		scale: 1.85,
	  },
	},
	alternative: {
	  classroom: {
		position: [0.3, -1.7, -1.5],
		rotation: [0, degToRad(-90), 0],
		scale: 0.4,
	  },
	  teacher: { position: [-1, -1.7, -3] },
	  board: { position: [1.4, 0.84, -8] },
	},
  };


const Experience = () => {

	const teacher = useAITeacher((state) => state.teacher);
	const classroom = useAITeacher((state) => state.classroom);
  return (
	<>
	
	<div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
        <TypingBox />
      </div>
	  <Leva hidden />
	<Canvas 
	camera={{position:[0,0,0.0001]}}
	>
	<CameraManager />
	<Suspense>
	<Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
	
	<Html {...itemPlacement[classroom].board} transform distanceFactor={0.5}>
		<div>
			<MessagesList/>
			<BoardSettings />
		</div>
	</Html>
	<Environment preset="sunset" />
            <ambientLight intensity={0.8} color="pink" />
	<Teacher 
	key={teacher}
	teacher={teacher}
	{...itemPlacement[classroom].teacher} 
	scale={1.5}
	rotation-y={degToRad(20)}
	/>
	<Gltf src={`models/classroom_${classroom}.glb`} {...itemPlacement[classroom].classroom}/>

	</Float>
	</Suspense>
	</Canvas>
	</>
  )
}

export default Experience

const CAMERA_POSITIONS = {
	default: [0, 6.123233995736766e-21, 0.0001],
	loading: [
	  0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
	],
	speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279],
  };
  
  const CAMERA_ZOOMS = {
	default: 1,
	loading: 1.3,
	speaking: 2.1204819420055387,
  };

const CameraManager = () => {
	const controls = useRef();
	const loading = useAITeacher((state) => state.loading);
	const currentMessage = useAITeacher((state) => state.currentMessage);
  
	useEffect(() => {
	  if (loading) {
		controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
		controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
	  } else if (currentMessage) {
		controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
		controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
	  }
	}, [loading]);

	useControls("Helper", {
		getCameraPosition: button(() => {
		  const position = controls.current.getPosition();
		  const zoom = controls.current.camera.zoom;
		  console.log([...position], zoom);
		}),
	  });
	return( <CameraControls 
	ref={controls}
	minZoom={1}
	maxZoom={3}
	polarRotateSpeed={-0.3}
	azimuthRotateSpeed={-0.3}
	mouseButtons={{
		left: 1,
		wheel: 16,
	}}
	touches={{
		one: 32,
		two: 512,
	}}
	/>
)
}

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");