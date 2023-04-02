const exec = require('child_process').exec;

const webcamID = "WEBCAM SKILLKORP SKP_W-10";

document.addEventListener('DOMContentLoaded', () => {
    var captureButton = document.getElementById("capture");
    var video = document.getElementById("video");

    var mediaDevices = navigator.mediaDevices;

    video.muted = true;

    mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        captureButton.addEventListener("click", () => {
            video.srcObject = null;

            stream.getTracks().forEach(track => {
                if (track.readyState == "live" && track.kind === "video") {
                    track.stop();
                }
            })

            try {
                exec(`ffmpeg -f dshow -i "video=${webcamID}" -frames:v 1 outputs/test.jpg`, (err, std) => {
                    alert(err || std);
                });
            } catch (err) {
                alert(err);
            }
        });

        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        })
    }).catch(alert);
})