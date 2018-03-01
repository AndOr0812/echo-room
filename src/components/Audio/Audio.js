import React from 'react'
// import socket from '../../socket'

const audioTest = () => {
  var handleSuccess = function(stream) {
    // const audioContext = new (window.AudioContext ||
    //   window.webkitAudioContext)()
    // const source = audioContext.createMediaStreamSource(stream)
    // const processor = audioContext.createScriptProcessor(1024, 1, 1)

    // source.connect(processor)
    // processor.connect(audioContext.destination)

    // processor.onaudioprocess = function(e) {
    //   console.log(e.inputBuffer)
    //   socket.emit('transmitAudio', 'audio sample')
    // }
    let audioArray = []
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    console.log('recording started')
    mediaRecorder.start(5000)
    mediaRecorder.ondataavailable = function(evt) {
      audioArray.push(evt.data)
      console.log(audioArray.length, evt.data)
      bufferToDataUrl(dataUrlToFile)
    }


    function bufferToDataUrl(callback) {
      let blob = new Blob(audioArray, {
        type: 'audio/webm'
      })

      let reader = new FileReader()
      reader.onload = function() {
        let file = callback(reader.result) // file is created. TODO: send to the server
      }
      reader.readAsDataURL(blob)
    }

    // returns file, that we can send to the server.
    function dataUrlToFile(dataUrl) {
      const binary = atob(dataUrl.split(',')[1]),
        data = []

      for (var i = 0; i < binary.length; i++) data.push(binary.charCodeAt(i))

      return new File([new Uint8Array(data)], 'audio-buffer.webm', {
        type: 'audio/webm'
      })
    }

  }
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(handleSuccess)
    .catch(err => console.error('Error' + err))
}

const audio = ({ props }) => {
  audioTest()
  return <div>Testing Audio...</div>
}

export default audio
