import { useAITeacher } from '@/hooks/useAITeacher'
import { useAnimations, useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {useState, useEffect, useRef} from 'react'
import { MathUtils, MeshStandardMaterial } from "three";
import { randInt } from "three/src/math/MathUtils";

export const teachers = ["Fatima", "Hamdan"]
const ANIMATION_FADE_TIME = 0.5;

const Teacher = ({
	teacher, ...props
}) => {

	const group = useRef()
	const {scene} = useGLTF(`models/Teacher_${teacher}.glb`)

	useEffect(() => {
		scene.traverse((child) => {
		  if (child.material) {
			child.material = new MeshStandardMaterial({
			  map: child.material.map,
			});
		  }
		});
	  }, [scene]);

	const {animations} = useGLTF(`models/animations_${teacher}.glb`)
	const { actions, mixer } = useAnimations(animations, group)
	const [animation, setAnimation] = useState("Idle")
	const currentMessage = useAITeacher((state) => state.currentMessage)
	const loading = useAITeacher((state) => state.loading)
	

	const [blink, setBlink] = useState(false);

	useEffect(() => {
	  let blinkTimeout;
	  const nextBlink = () => {
		blinkTimeout = setTimeout(() => {
		  setBlink(true);
		  setTimeout(() => {
			setBlink(false);
			nextBlink();
		  }, 100);
		}, randInt(1000, 5000));
	  };
	  nextBlink();
	  return () => clearTimeout(blinkTimeout);
	}, []);

	const lerpMorphTarget = (target, value, speed = 0.1) => {
		scene.traverse((child) => {
		  if (child.isSkinnedMesh && child.morphTargetDictionary) {
			const index = child.morphTargetDictionary[target];
			if (
			  index === undefined ||
			  child.morphTargetInfluences[index] === undefined
			) {
			  return;
			}
			child.morphTargetInfluences[index] = MathUtils.lerp(
			  child.morphTargetInfluences[index],
			  value,
			  speed
			);
		  }
		});
	  };

	  useEffect(() => {
		if (loading) {
		  setAnimation("Thinking");
		} else if (currentMessage) {
		  setAnimation(randInt(0, 1) ? "Talking" : "Talking2");
		} else {
		  setAnimation("Idle");
		}
	  }, [currentMessage, loading]);

	  useEffect(() => {
		actions[animation]
		  ?.reset()
		  .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
		  .play();
		return () => {
		  actions[animation]?.fadeOut(ANIMATION_FADE_TIME);
		};
	  }, [animation, actions, mixer]);


	  useFrame(({ camera }) => {
		// Smile
		lerpMorphTarget("mouthSmile", 0.2, 0.5);
		// Blinking
		lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5);
	
		// Talking
		for (let i = 0; i <= 21; i++) {
		  lerpMorphTarget(i, 0, 0.1); // reset morph targets
		}
	
		if (
		  currentMessage &&
		  currentMessage.visemes &&
		  currentMessage.audioPlayer
		) {
		  for (let i = currentMessage.visemes.length - 1; i >= 0; i--) {
			const viseme = currentMessage.visemes[i];
			if (currentMessage.audioPlayer.currentTime * 1000 >= viseme[0]) {
			  lerpMorphTarget(viseme[1], 1, 0.2);
			  break;
			}
		  }
		  if (
			actions[animation].time >
			actions[animation].getClip().duration - ANIMATION_FADE_TIME
		  ) {
			setAnimation((animation) =>
			  animation === "Talking" ? "Talking2" : "Talking"
			); // Could load more type of animations and randomization here
		  }
		}
	  });

	  const [thinkingText, setThinkingText] = useState(".");

	  useEffect(() => {
		if (loading) {
		  const interval = setInterval(() => {
			setThinkingText((thinkingText) => {
			  if (thinkingText.length === 3) {
				return ".";
			  }
			  return thinkingText + ".";
			});
		  }, 500);
		  return () => clearInterval(interval);
		}
	  }, [loading]);

	  return (
		<group {...props} dispose={null} ref={group}>
		  {loading && (
			<Html position-y={teacher === "Fatima" ? 1.6 : 1.8}>
			  <div className="flex justify-center items-center -translate-x-1/2">
				<span className="relative flex h-8 w-8 items-center justify-center">
				  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
				  <span className="relative inline-flex items-center justify-center duration-75 rounded-full h-8 w-8 bg-white/80">
					{thinkingText}
				  </span>
				</span>
			  </div>
			</Html>
		  )}
		  <primitive object={scene} />
		</group>
	  );
	}

export default Teacher

teachers.forEach((teacher) => {
	useGLTF.preload(`/models/Teacher_${teacher}.glb`)
})