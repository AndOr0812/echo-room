import React from 'react'

const audioTest = () => {
  var handleSuccess = function(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(stream)
    const processor = audioContext.createScriptProcessor(1024, 1, 1)

    source.connect(processor)
    processor.connect(audioContext.destination)

    processor.onaudioprocess = function(e) {
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer)
    }
  }

  navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess)
}

const audio = ({ props }) => {
  audioTest()
  return <div>I am here</div>
}

export default audio
