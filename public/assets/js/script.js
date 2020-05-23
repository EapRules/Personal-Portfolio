/*jslint browser:true */
$(document).ready(function () {
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 10;
	var $menuButton = $('button.navbar-toggle');
	var $menuIcon = $('.navbar-toggle .glyphicon');
	var $collapsedMenuItem = $('.navbar-collapse.collapse li');
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var $scrollButton = $('.scroll');
	var $socialIcon = $('.social');
  var $alertBox = $('#status');

	// -----------------------
  // Fixed Nav After Scroll 
  // -----------------------
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgba(0, 0, 0, 0.9)');
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;


	// Collapse menu on resize
	$(window).resize(closeMenu());

	// -------------------------
  // Smooth Scroll to Content
  // -------------------------
	$scrollButton.on('click', function (e) {
		e.preventDefault();
		var $link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $($link).offset().top - 59
		}, 900);
	});

  
  // --------------------------
  // Center Modals Vertically
  // --------------------------
	function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find('.modal-dialog');
    var $offset = ($(window).height() - $dialog.height()) / 2;
    var $bottomMargin = parseInt($dialog.css('margin-bottom'), 10);
    // If modal is taller than screen height, top margin = bottom margin
    if ($offset < $bottomMargin) {
    	$offset = $bottomMargin;
    }
    $dialog.css('margin-top', $offset);
  }
  $(document).on('show.bs.modal', '.modal', centerModal);
  $(window).on('resize', function () {
    $('.modal:visible').each(centerModal);
  });

  // --------------------------
  // Contact Form Submission
  // --------------------------
  // Hide alert box when closing (instead of the default action of removing the element)
  $alertBox.children('.close').on('click', function () {
    // Animate close
    $(this).parent().slideUp('fast').animate({ opacity: 0 }, { queue: false, duration: 'fast'});
  });

  function showResponse(msg) {
    // First, remove alert classes
    $alertBox.removeClass('alert-success alert-warning');
    // Check if a successful message was returned
    if (msg.includes('Message sent successfully!')) {
      $alertBox.addClass('alert-success');
      // Trim off error text to leave only thank you message
      msg = msg.substr(msg.indexOf('Message sent'));
      // Clear contact form
      $('#contactForm')[0].reset();
    } else {
      $alertBox.addClass('alert-warning');
    }
    // Insert response message
    $alertBox.children('p').html(msg);
    // Animate open
    $alertBox.slideDown('fast').animate({ opacity: 1 }, { queue: false, duration: 'fast'});
  }


});