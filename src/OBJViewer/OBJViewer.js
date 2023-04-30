import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const OBJViewer = ({ OBJFile }) => {
  // CREATING REFERENCE TO THE DIV WHERE WE WILL SHOW OUR CANVAS
  const containerRef = useRef(null);

  // -------------------------- THREE.JS CODE -------------------------- vv
  useEffect(() => {
    const scene = new THREE.Scene();

    // ------ CREATES CAMERA
    const camera = new THREE.PerspectiveCamera(25, 1, 0.1, 2000);

    // ------ SETS POSITION OF CAMERA IN X,Y,Z(THE DEFAULT IS (0,0,0))
    camera.position.set(0, 0, -300);

    // ------ THIS CODE IS ALSO ACCOMPLISHING THE SAME AS THE CODE ABOVE
    // camera.position.z = -300;

    // ------ CREATE AN AMBIENT LIGHT
    const ambLight = new THREE.AmbientLight(0x404040);
    // ------ ADD THE LIGHT TO THE SCENE
    scene.add(ambLight);
    // ------ CREATE A DIRECTIONAL LIGHT
    let light = new THREE.DirectionalLight();
    light.position.set(10, 30, -30);
    // ------ ADD THE LIGHT TO THE SCENE
    scene.add(light);
    let helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);

    // ------ CREATES CONTROLS
    const controls = new OrbitControls(camera, containerRef.current);
    // MAKES THE PHYSICS HEAVIER/NICER FOR CONTROLS
    controls.enableDamping = true;
    // MAKES MODEL AUTO-ROTATE
    controls.autoRotate = true;
    // SETS THE ROTATION SPEED
    controls.autoRotateSpeed = 4;
    // SETTING TO FALSE MAKES IT SO USER CAN'T PAN
    controls.enablePan = false;
    // SETTING TO FALSE MAKES IT SO USER CAN'T ZOOM
    controls.enableZoom = false;

    // ------ CREATES A NEW INSTANCE OF A RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // ------ SETS THE SIZE OF THE RENDERER TO THE VALUE OUR renderSize FUNCTION RETURNS
    renderer.setSize(360, 360);

    // renderer HAS PROPERTY domElement. THIS HOLDS OUR CANVAS WITH OUR MODEL. WE ARE ATTACHING THAT TO THE DIV WHERE WE WANT TO SHOW IT BELOW IN OUR COMPONENT RETURN.
    containerRef.current.appendChild(renderer.domElement);

    // ------ CREATES LOADER
    const objLoader = new OBJLoader();
    // ------ LOADS THE OBJ FILE
    objLoader.load(OBJFile, (model) => {
      // once the obj is loaded, add it to the scene
      scene.add(model);
      // once the obj is added to the scene, render the scene
      renderer.render(scene, camera);
    });

    const animate = () => {
      // ------ REQUEST RENDER OF DRAWINGS/ANIMATION
      requestAnimationFrame(animate);
      // ------ UPDATE THE CONTROLS
      controls.update();
      // ------ RENDER THE SCENE
      renderer.render(scene, camera);
    };
    // CALL THE ANIMATE FUNCTION
    animate();
  }, [OBJFile]);
  // -------------------------- THREE.JS CODE -------------------------- ^^

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={containerRef}></div>
      {/* THIS IS MY OWN TITLE YOU CAN INSERT YOUR OWN */}
      <div style={{ margin: "10px" }}>BO_CODES X BLENDER_SUS</div>
    </div>
  );
};

export default OBJViewer;
