var isopen_sharemenu = false;

$(document.body).on('click', '.fa-share-alt', function(e){
	if (!isopen_sharemenu) {
		$('.social-button-wrapper').children().css("display", "inline-block");
		$('.icon-button').children().css("display", "inline-block");
		isopen_sharemenu = true;
	} else {
		$('.social-button-wrapper').children().css("display", "none");
		$('.icon-button').children().css("display", "none");
		isopen_sharemenu = false;
	}
});


$(document.body).on("click", ".fa-times", function() {
	
	$('.seeds-modal-call').addClass('animated fadeOut');
	setTimeout(function() {
		$('.seeds-modal-call').removeClass('animated fadeOut');
		$('.seeds-modal-call').removeClass('animated fadeIn');
		$('.seeds-modal-call').css('display','none');
		/*$('.seeds-modal-call').removeClass('seeds-modal');*/
		$('.temp-dashboard').remove();
	}, 800);
	
	
	 /*검사하고 씨드 내용이 검사 결과를 반영하도록~*/
	if (memberInfo != undefined) {
		var mbtiType = memberInfo.resultResult;
      $('.card--oil div:nth-child(2) .card__count-text').text('당신의 타입은 ' + mbtiType + '입니다');
	}
	
	/*비회원일 경우 가입창 띄우기*/
	if (memberInfo == undefined) {
	  $('.auth-login-form').load(clientRoot + "/auth/login.html .login-form-container", function() {
	    $('.auth-login-form').css("display", "block");
	    $('.login-form-card').addClass("animated fadeInRight");
	    $('.login-form-container').stop().addClass('login-form-active');
	    });
	}
	
});

function checkTestResult(){
	
	 /*검사하고 씨드 내용이 검사 결과를 반영하도록~*/
	if (memberInfo != undefined) {
		var mbtiType = memberInfo.resultResult;
		
		if (memberInfo.resultNo != null) {
			$('.card--oil div:nth-child(2) .card__count-text').text('당신의 타입은 ' + mbtiType + '입니다');
		}
	}
}



