CAPTURE_IMG_WIDTH = 640
CAPTURE_IMG_HEIGHT = 480
 
function convert_to_VND(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +" VND";
}
 
// HTML5 WEBCAM
Webcam.set({
  width: CAPTURE_IMG_WIDTH,
  height: CAPTURE_IMG_HEIGHT,
  image_format: 'jpeg',
  jpeg_quality: 90
});
 
// attach the webcame object to that div #my-camera
Webcam.attach( '#my-camera' );
 
// event trigger when the button is clicked when we want predict
let btn_capture = document.getElementById('btn-capture-image')
btn_capture.addEventListener('click', function (e) {
  Webcam.snap(function(data_uri) {
    let json_data = {'data-uri': data_uri }
 
    // this is ajax part when it send the json data of the image from the 
    // webcame to our flask back end at /predict using POST method 
    fetch('/predict/', {
      method: 'POST',
      processData: false,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(json_data)
    }).then(res=>res.json())
      .then(data => {
 
        // this is when we successfully receive the data back from the flask backend
        console.log(data)
 
        // we are preparing the content of all probabilities to display
        html = ''
        for( let i = 0; i < data['probs'].length; i++) {
          data_splitted = data['probs'][i]
          html += '<div class="prob-row"><span class="num">' + convert_to_VND(data_splitted[1]) + '</span> : <span class="prob">'+ (data_splitted[0]*100).toFixed(2) + ' %</span></div>'
        }
 
        // we display the content of all probabilities on the HTML page 
        document.getElementById('probs').innerHTML=html
 
        // we display final predicted class on the HTML page
        document.getElementById('class-result').innerHTML=convert_to_VND(data['label'])
 
      });
  });
});