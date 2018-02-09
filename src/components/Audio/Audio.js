import React from 'react';

const audioTest = () => {
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  // Create a buffer for the incoming sound content
  var source = audioContext.createBufferSource();
  // Create the XHR which will grab the audio contents
  console.log(audioContext, source)
}


const audio = ({ props }) => {
  audioTest();
  return (
    <div>
      I am here
    </div>
  );
}






export default audio;