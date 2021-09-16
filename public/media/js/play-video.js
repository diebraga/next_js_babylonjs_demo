import $ from 'jquery';
		$(function() {
			$(document).on("click", ".bt-close-video", function(e) {
				stopAllYouTubeVideos();
				
				$(".box-modal-p").fadeOut(100);

				$(".box-modal-p").css("top","0");
				$(".box-modal-p").css("left","0");

				$(".box-modal-p").removeClass("box-video-mini");
				$(".cont-modal-v").addClass("content-modal-p");

				$("#box-video-palco-iframe").attr("width","100%");
				$("#box-video-palco-iframe").attr("height","560");

				$(".control-min").fadeOut(0);
				$(".control-max").fadeIn(0);
				verifPlay();
				$("#renderCanvas").focus();
			});
			$(document).on("click", ".bt-close-modal-p", function(e) {
				stopAllYouTubeVideos();
				$(".box-modal-p").fadeOut(100);
				verifPlay();
				$("#box-video-palco-iframe").attr("src","");
				$("#renderCanvas").focus();
			});
			$(document).on("click", ".bt-min-modal-p", function(e) {
				music.stop();

				$(".cont-modal-v").removeClass("content-modal-p");
				$(".box-modal-p").addClass("box-video-mini");

				$(".box-modal-p").css("top","auto");
				$(".box-modal-p").css("bottom","0");
				$(".box-modal-p").css("left","0");

				$("#box-video-palco-iframe").attr("width","320");
				$("#box-video-palco-iframe").attr("height","180");

				$(".box-video-mini").draggable({
					containment: ".cont-limit-play",
					handle: ".bt-drag-video",
					scroll: false,
					iframeFix: true,
				});

				$(".control-max").fadeOut(0);
				$(".control-min").fadeIn(0);
				//$("#box-video-mini").fadeIn(100);
			});

			$(document).on("click", ".bt-max-video", function(e) {
				$(".box-modal-p").removeClass("box-video-mini");
				$(".cont-modal-v").addClass("content-modal-p");

				$(".box-modal-p").css("top","0");
				$(".box-modal-p").css("left","0");

				$("#box-video-palco-iframe").attr("width","100%");
				$("#box-video-palco-iframe").attr("height","560");

				$(".control-min").fadeOut(0);
				$(".control-max").fadeIn(0);
			});

			var stopAllYouTubeVideos = () => { 
			  // 	var iframes = document.querySelectorAll('iframe');
			  // 	Array.prototype.forEach.call(iframes, iframe => { 
			  //   	iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
			  // 		func: 'stopVideo' }), '*');
			 	// });
				$('.video-iframe').each(function(index) {
			        $(this).attr('src', $(this).attr('src'));
			    });
			}
			function verifPlay(){
				if (isButtonSongActive) {
			      if (music.isPlaying == false) {
			        BABYLON.Engine.audioEngine.unlock()
			        music.play();
			      }
			    }
			}

		});