function fileSelect(){
    var file = document.querySelector('.fileUpload').files[0];
    if(file){
        var fileSize =0;
        document.querySelector('.fileName').innerHTML = file.name;
        document.querySelector('.fileSize').innerHTML = file.size;
        document.querySelector('.fileType').innerHTML = file.type;
    }
	document.querySelector('.progress-bar').style.width = 0+'%';
	document.querySelector('.progress-bar')["aria-valuenow"]= 0;
}
function uploadFile(){
    var fd = new FormData();
    var file = document.querySelector('.fileUpload').files[0];
    fd.append('fileUpload',file);
    console.log(fd);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress',progress,false);//上传监听过程
    xhr.addEventListener('load',success,false);//上传成功
    xhr.addEventListener('error',error,false);///上传出错
    xhr.addEventListener('abort',abort,false);//上传退出
    xhr.open('POST','/post');
    xhr.send(fd);
}
var progress = success = error = abort = function(){};
var progress = function(event){
	if(event.lengthComputable){
		var percent = Math.round(event.loaded*100/event.total);//上传的进度
		document.querySelector('.progress-bar').style.width = percent+'%';
		document.querySelector('.progress-bar')["aria-valuenow"]= percent;
	}
}
