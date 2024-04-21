var path = 'https://f521-144-118-77-190.ngrok-free.app/predict'


async function upload(formData) {
  try {
    const response = await fetch(path, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}


const uploadImage = function(){
  var biodegradable = Math.random(0, 1)
  return(biodegradable>.5)
	const formData = new FormData();
	const src = 'https://github.com/toomeem/codefest2024/blob/7a99e521313d6ca57888d388716f77a1db999567/assets/Vruj.png'

	formData.append("username", "abc123");
	formData.append("password", "123456");
	formData.append("UploadFile", src);
	formData.append("type", "image/png");
	formData.append("Content-Type", "multipart/form-data");
	formData.append("Accept", "application/json");

	upload(formData);


};



export default uploadImage;
