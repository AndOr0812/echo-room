import React from 'react'
// import socket from '../../socket'
import axios from 'axios'

const audioTest = () => {
  var handleSuccess = function(stream) {
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
        // var a = window.document.createElement('a')
        // a.href = URL.createObjectURL(file)
        // a.download = 'audio.webm'
        // document.body.appendChild(a)
        // a.click()
        // document.body.removeChild(a)
        const formData = new FormData()
        formData.append('audio-recording', file)
        axios
          .post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => console.log(response))
          .catch(error => console.error(error))
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
