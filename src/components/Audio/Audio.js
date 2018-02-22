import React from 'react'
import socket from '../../socket'

const audioTest = () => {
  var handleSuccess = function(stream) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    const source = audioContext.createMediaStreamSource(stream)
    const processor = audioContext.createScriptProcessor(1024, 1, 1)

    source.connect(processor)
    processor.connect(audioContext.destination)

    processor.onaudioprocess = function(e) {
      console.log(e.inputBuffer)
      socket.emit('transmitAudio', 'audio sample')
    }
  }
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(handleSuccess)
}

const audio = ({ props }) => {
  audioTest()
  return <div>Testing Audio...</div>
}

export default audio
