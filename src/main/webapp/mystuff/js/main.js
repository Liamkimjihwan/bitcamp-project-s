// 좋아요 버튼 눌렀을 때
$(document.body).on("click", ".buttonHolder", function() {// 좋아요 버튼 눌렀을 때
	event.preventDefault();
	var curNo = $(this).attr("data-no");
	var sno = memberInfo.memberNo;
	if($(this).children(".btn").hasClass("checked")) {
		$(this).children(".btn").removeClass("checked");
		$($('.mystuff-call').find('.buttonHolder')).each(function() {
		if ($(this).attr('data-no') == curNo) {
			$(this).children('.heart').removeClass('checked');
			$(this).children(".heart").css("color","black");
			}
		});
		console.log($(this).parents(".mt-like-list"));
		console.log($(this).parents(".vdoConts"));
	if($(this).parents(".mt-like-list")) {
		$(this).parents(".mt-like-list").remove();
	}
	if($(this).parents(".vdoConts")) {
		$(this).parents(".vdoConts").remove();
	}
	$(this).children(".btn").css("color","black");
	$.post(serverRoot + '/like/delete.json?curNo=' + curNo, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
			console.log("삭제했다.");
		}, 'json');
		} else {
			$(this).children(".btn").addClass("checked");
			$(this).children(".checked").css("color","#f94e66");
			$.post(serverRoot + '/like/add.json?curNo=' + curNo + '&sno=' + sno, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			console.log("했다.");
		}, 'json');
		}
})
			
// mystuff 인물 모달 창 띄우기
	$(document.body).on( "click", ".model-slide > a", function() {
		console.log("-----------------------------------------------");
		console.log("인물모달창");
		console.log(this);
		var cono = $(this).attr('data-no');
		console.log(cono);
		$.getJSON(serverRoot + '/person/getOne.json', 
			{
				"cono": cono
			}, function(ajaxResult) {
					var status = ajaxResult.status;
					if (status != "success") return;
					console.log("인물 리스트0");
					console.log(ajaxResult);
					console.log(ajaxResult.data.personJob);
					var name = ajaxResult.data.personName;
					var job = ajaxResult.data.personJob;
					var img = ajaxResult.data.personImage2;
					var schl = ajaxResult.data.personSchool;
					var desc = ajaxResult.data.personDescription;
					
					$('.mystuff-modal').load('mystuff/person-modal.html .person-dash', function() {
						$('.card-image img').attr('src',img);
						$('.name .p-name').text(name);
						$('.p-job').html(job);
						$('.p-schl').html(schl);
						$('.p-descs').html(desc);
					});
			});
	});
	
// 멘토 모달 띄우기 
	var cono; // 멘티가 멘토에게 메세지를 보내기 위해 필요한 해당 설계도 컨텐츠 번호
    var eno; // 해당 설계도 관한 멘토 일련번호
	$(document.body).on("click", ".map-img", function() {
		console.log("-----------------------------------------------");
		console.log("멘토 모달창");
		console.log($(this).parents(".mento-slide"));
		cono = $(this).parents(".mento-slide").children('.mento-conts').children('.buttonHolder').attr('data-no');
		sno = memberInfo.memberNo;
		console.log(cono);
		console.log(sno);
		$.getJSON(serverRoot + '/message/list.json', 
			{
			"cono": cono,
			"sno": memberInfo.memberNo,
			"mno": memberInfo.memberNo
			}, function(ajaxResult) {
					var status = ajaxResult.status;
					if (status != "success") return;
					console.log("멘토와의 채팅");
					console.log(ajaxResult.data.list);
					console.log(ajaxResult.data.mento);
					console.log(ajaxResult.data.list.length);
					    var list = ajaxResult.data.list;
					    eno = ajaxResult.data.mento.mentoNo;
						var mteName = ajaxResult.data.mento.name;
						var mtePhoto = serverRoot + '/mystuff/img/' + ajaxResult.data.mento.photoPath;
						var mteMap = ajaxResult.data.mento.planMap
						
//						var mteMap = serverRoot + '/upload/' + ajaxResult.data.mento.planImage;
						console.log(mteName);
						console.log(mtePhoto);
					$('.mystuff-modal').load('mystuff/plan-modal.html .plan-modal', function() {
					$('#mystuff-messenger').submit(function () {
						return false;
					});
					$("#mystuff-chat-msg").attr("autocomplete", "off");
					$.each(list, function(k, v) {
				      var text   = list[k].message;
				      var writer = list[k].writerNo;
				      if (writer == memberInfo.memberNo) {
				    	  console.log("본인이 쓴것")
				          $('.mystuff-chatwindow').append('<div class="right">' + text + '</div>');
				      } else {
				    	  console.log("상대방이 쓴것")
				          $('.mystuff-chatwindow').append('<div class="left bye">' + text + '</div>');
				      }
				      $(".mystuff-chatwindow").scrollTop($(".mystuff-chatwindow")[0].scrollHeight);
				    }); // 메세지 리스트 div 영역으로 나타내기
                    console.log("모달창 들어왔다.")
                    
                    $('.mystuff-chat-bot h3').text(mteName);
                    $('.mystuff-chat-bot img').attr('src',mtePhoto);
                    $('#viewSavedModel').val(mteMap);
                    view_init();
                    
                    
//                    $('.detail-plan-area img').attr('src',mteMap);
                     
			});
		});
	});

// 멘토에게 질문 남기기
	$(document.body).on( "click", "#mystuff-chat-btn", function() {
	     var text = $('#mystuff-chat-msg').val();
	     console.log(text);
	     $('.mystuff-chatwindow').append('<div class="right">' + text + '</div>');
	     $('#mystuff-chat-msg').val('');
	     $(".mystuff-chatwindow").scrollTop($(".mystuff-chatwindow")[0].scrollHeight);
	       $.getJSON(serverRoot + '/message/mentee-send.json',
	           {
	             "msge": text, 
	             "cono": cono,
	             "sno" : memberInfo.memberNo, 
	             "eno" : eno
	           }, function(ajaxResult) {
	             var status = ajaxResult.status;
	             if (status != "success") return;
	       });
	});

// 영상 모달 띄우기
	$(document.body).on( "click", ".rec-video1", function() {
		var videoAddr = $(this).parent('.video-conts').children('.video-btm').attr('iframe-addr').replace('www.ted.com','embed.ted.com');
		var cono = $(this).parent('.video-conts').children('.video-btm').children('.buttonHolder').attr('data-no');
		var list = new Array();
		$.getJSON(serverRoot + '/videoDetail/getOne.json', 
			{
			"cono": cono
			}, function(ajaxResult) {
					var status = ajaxResult.status;
					if (status != "success") return;
					list = ajaxResult.data.list;
					console.log(list);
					if($(".frame-area-center").hasClass("mystuff")) {
					$('.mystuff-modal').load('mystuff/video-modal.html #contents', function() {
						console.log("여기도 들어오나")
						$('#iframe').append("<iframe src="+"'"+videoAddr+"'"+"style='width:;width: 100%;height: 386px;' background-color: black; frameborder='0' scrolling='no' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>")
						$('#talk-speaker-description .speakerName').text(list[0].speakerName);
						$('#talk-speaker-description .videoDsc').text(list[0].videoDescription);
						$('.talkSpeaker .speakerName').text(list[0].speakerName);
						$('.talkSpeaker .speakerJob').text(list[0].speakerJob);
						$('.talkSpeaker').children('#talk-speaker-thumb').attr('src',list[0].videoImage);
					    });
				      } // 현재 페이지가 mystuff 라면 ~
				      else if($(".frame-area-center").hasClass("likes")) {
							$('.video-like-modal').load('mystuff/talks.html #contents', function() {
								console.log("여기도 들어오나")
								
								$('#iframe').append("<iframe src="+"'"+videoAddr+"'"+"style='width:;width: 100%;height: 386px;' background-color: black; frameborder='0' scrolling='no' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>")
								$('#talk-speaker-description .speakerName').text(list[0].speakerName);
								$('#talk-speaker-description .videoDsc').text(list[0].videoDescription);
								$('.talkSpeaker .speakerName').text(list[0].speakerName);
								$('.talkSpeaker .speakerJob').text(list[0].speakerJob);
								$('.talkSpeaker').children('#talk-speaker-thumb').attr('src',list[0].videoImage);
							    });
						      }; // 현재 페이지가 mystuff 라면 ~
				});
	})
	
// 슬라이드 호출 함수
    function jcarousels() {
		$('.jcarousel').jcarousel();
        $('.jcarousel-control-prev').on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
        }).on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
        }).jcarouselControl({
           target: '-=1'
        });
        $('.jcarousel-control-next').on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
        }).on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
        }).jcarouselControl({
                target: '+=1'
        });
        $('.jcarousel-pagination').on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
        }).on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
        }).jcarouselPagination();
    };
    
	$(".hover").mouseleave(function () {
		$(this).removeClass("hover");
	});
	$(".video").hover(function() { // 비디오 hover효과
		$(".video").css("background-color", "rgba(240, 128, 128, 0.27)");
    });
	$(".video").mouseleave(function () {
		$(".video").css("background-color", "transparent");
	});
//  추천영상 더보기 버튼
    $(".videoBox").hover(function(){
    	$(this).children(".video-box").css({"height":"20px", "width":"20px"});
    });
	$(".videoBox").mouseleave(function () {
	  $(this).children(".video-box").css({"height":"0px", "width":"0px"});
	});
    $(".video-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    })
	$(".video-box").mouseleave(function () {
	  $(this).css({"height":"20px", "width":"20px"});
	});
	$(".jobBox").hover(function(){
		$(this).children(".job-box").css({"height":"20px", "width":"20px"});
	});
	$(".jobBox").mouseleave(function () {
		$(this).children(".job-box").css({"height":"0px", "width":"0px"});
	});
    $(".job-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    });
	$(".job-box").mouseleave(	function () {
		$(this).css({"height":"20px", "width":"20px"});
	});
/*  $("body").tooltip({   
    selector: "[data-toggle='tooltip']",
    container: "body"
  })
    //Popover, activated by clicking
    .popover({
    selector: "[data-toggle='popover']",
    container: "body",
    html: true
  });*/
  //They can be chained like the example above (when using the same selector).

// 멘토 디테일 리스트 hover 효과
	function mtDetailHover() {
		$(".mt-list").hover(function(){
			$(this).css("cursor","pointer");
			$(this).children(".mt-btm").css({"background": "linear-gradient(90deg, rgba(105, 183, 235, 0.35), #b3dbd3, rgba(244, 214, 219, 0.55)"});
			$(this).children(".mt-btm").children(".mt-name").css("display", "inline-block");
			$(this).children(".mt-btm").children(".detail-mt-photo").css("top", "-50px");
		});
		$(".mt-list").mouseleave(function () {
			$(this).children(".mt-btm").css("background", "transparent");
			$(this).children(".mt-btm").children(".mt-name").css("display", "none");
			$(this).children(".mt-btm").children(".detail-mt-photo").css("top", "-15px");
		});
	};

/*** 
 * 인물 더보기 구현 보류
	$(document.body).on( "click", ".person-box .fpc_page-tip", function() {
		 $(".mystuff").load("likes/person.html .dashboard", function() {
			 
		 loadPersonList(currPageNo, pageSize, sno);
		 $('.prevPgBtn').click(function() {
			 if (currPageNo > 1) {
				 loadPersonList(--currPageNo, 4, sno);
			 }
		 });
		 
		 $('.nextPgBtn').click(function() {
			 loadPersonList(++currPageNo, 4, sno);
		   });
		 
		 function personPreparePagingButton(totalCount) {
			 // 현재 페이지 번호가 1이면 이전 버튼을 비활성시킨다.
			 if (currPageNo <= 1) {
				 $('.prevPgBtn').attr('disabled', true);
			 } else {
				 $('.prevPgBtn').attr('disabled', false);
			 }
			 
			 var maxPageNo = parseInt(totalCount / pageSize);
			 console.log(maxPageNo);
			 if ((totalCount % pageSize) > 0) {
				 maxPageNo++;
			 }
			 
			 if (currPageNo >= maxPageNo) {
				 $('.nextPgBtn').attr('disabled', true); 
			 } else {
				 $('.nextPgBtn').attr('disabled', false);
			 }
			 
			 // 현재 페이지 번호를 출력한다.
			 $('.pageNo').text(currPageNo);
	}
*/

/*** 
 * 퍼슨 리스트 플레이 펑션 
	function listPlay() {
		var $play = $('.play'),
		    $detail  = $('.detail'),
		    $person = $('.person', $detail),
		    $close = $('.close');
		$('.persons .person').click(function(){
		  $person.html($(this).html());
		  $play.appendTo($person);

		  $poster = $('.poster', this).addClass('active');
		  $('.poster', $detail).css({
		    top: $poster.position().top,
		    left: $poster.position().left,
		    width: $poster.width(),
		    height: $poster.height()
		  }).data({
		    top: $poster.position().top,
		    left: $poster.position().left,
		    width: $poster.width(),
		    height: $poster.height()
		  })
		  $detail.show();
		  $('.poster', $detail).delay(10).queue(function(next) {
		    $detail.addClass('ready');
		    next();
		  }).delay(100).queue(function(next){
		    $(this).css({
		      top: '-10%',
		      left: '-6%',
		      width: 266,
		      height: 400
		    });
		    next();
		  })
		})

		--------------------
		Close
		--------------------
		function close(){
		  $p = $('.detail .poster');
		  $p.css({
		    top: $p.data('top'),
		    left: $p.data('left'),
		    width: $p.data('width'),
		    height: $p.data('height'),
		  })
		  $detail.removeClass('ready').delay(500).queue(function(next){
		    $(this).hide();
		    $poster.removeClass('active');
		    next();
		  });
		}

		$close.click(close);
		$('body').click(function(e){
		  $p = $(e.target).parents();
		  if ($p.is('.dashboard')){
		    return false;
		  } else {
		    close();
		  }
		})

		--------------------
		CodePen Thumbnail
		--------------------
		setTimeout(function(){
		  $('.person:eq(0)').click();
		}, 300);
		setTimeout(function(){
		  close();
		},1700);
	};
*/