var gJs = {};
gJs.wrapperClass = 'gallery-js-wrapper';
gJs.containerClass = 'gallery-js-container';
gJs.overflowClass = 'gallery-js-overflow';
gJs.imageClass = 'gjs-image';
gJs.imageWrapperClass = 'gjs-image-wrapper';
gJs.thumbWrapperClass = 'gjs-thumb-wrapper';
gJs.thumbContainerClass = 'gjs-thumb-container';
gJs.thumbOverflowClass = 'gjs-thumb-overflow';
gJs.thumbClass = 'gjs-thumbnail';
gJs.galleryNavContainer = 'gjs-nav-container';
gJs.thumbArrowClass = 'gjs-arrow';
gJs.arrowClass = 'gjs-arrow';
gJs.arrowLeftClass = 'arrow-left';
gJs.arrowRightClass = 'arrow-right';
gJs.arrowLinkClass = 'gjs-link-arrow';
gJs.arrowLinkIconClass = 'gjs-link-arrow-icon';
gJs.arrowIconClass = 'glyphicon';
gJs.arrowIconLeftClass = 'glyphicon-chevron-left';
gJs.arrowIconRightClass = 'glyphicon-chevron-right'

gJs.imageSourceAttr = 'data-image-source';
gJs.imageIdAttr = 'data-image-id';
gJs.thumbAttr = 'data-gjs-thumb';

gJs.currentClass = 'current';

gJs.arrowWidth = 60;

galleryJs = function(obj, option) {
	var imageIndex, thumbIndex, thumbArrowIndex, arrowIndex;
	var gallery = obj;

	// Defining the (API) Options
		var options = {};
		options.imgWidth = option.imgWidth;
		options.imgHeight = option.imgHeight;
		options.keyboardNav = option.keyboardNav;
		options.captions = option.captions;

	// Defining the Settings
		var settings = {};
		settings.stepCount = 0;
		settings.slideCount = 0;

	// Defining the Images
		var galleryImages = new Array();
		var galleryThumbImages = new Array();

	// Defining the Variables
		var parent = gallery.parentNode;
	// Creating and Inserting the Gallery Container
		var galleryContainer = document.createElement('div');
		galleryContainer.classList.add(gJs.containerClass);
		parent.insertBefore(galleryContainer, gallery);
		galleryContainer.appendChild(gallery);
	// Creating and Inserting the Gallery Wrapper
		var galleryWrapper = document.createElement('div');
		galleryWrapper.classList.add(gJs.wrapperClass);
		parent.insertBefore(galleryWrapper, galleryContainer);
		galleryWrapper.appendChild(galleryContainer);
	// Adding Class to Gallery Div
		gallery.classList.add(gJs.overflowClass);
	// Defining Wrapper/Container Variables
		var wrapper = gallery.parentNode.parentNode;
		var container = gallery.parentNode;
		var wrapperWidth = wrapper.clientWidth;

	// Config: the Images
		var images = gallery.getElementsByClassName(gJs.imageClass);
		settings.slideCount = images.length;
		for(imageIndex = 0; imageIndex < images.length; imageIndex++) {
			// Defining the Variables
				var source;
				var image = images[imageIndex];
				var imageParent = image.parentNode;
				var imageId = imageIndex+1;
			// Grabbing the Image Sources
				if(image.tagName === 'IMG') {
					source = image.getAttribute('src');
				} else if (image.tagName === 'A') {
					source = image.getAttribute('href');
				}
			// Push Each Image to the GalleryImages Array
				galleryImages.push(source);
		}
		// settings.slideCount = settings.slideCount - 1;

	// Config: Remove the Images and Create the First Image
		// Function: Remove Image from DOM 
			var domRemoveImage = function() {
				var imagesLength = images.length;
				for(var idx = imagesLength -1; idx >= 0; idx--) {
					var image = images[idx];
					image.parentNode.removeChild(image);
				}
			}
		// Function: Creating the First Image
			var createImage = function(){
				domRemoveImage();
				var firstImageSource = galleryImages[0];
				var firstImage = document.createElement('img');
				firstImage.setAttribute('src', firstImageSource);
				gallery.appendChild(firstImage);
				wrapImage(firstImage);
			}
		// Function: Wrapping Every Image in a Image Wrapper Div
			var wrapImage = function(image) {
				var imageWrapper = document.createElement('div');
				imageWrapper.classList.add(gJs.imageWrapperClass);
				imageParent.insertBefore(imageWrapper, image);
				imageWrapper.appendChild(image);
				if(options.imgHeight) {
					imageWrapper.style.height = options.imgHeight + 'px';
				}			
			}
		// Function: Creating the Image Init Stack
			var initImage = function() {
				createImage();
			}
		// Function: Initiation
			initImage();

	// Config: The Thumbnails 
		// Defining the Variables
			var thumbImagesWidth = 0;
		// Creating the Thumbnail Wrapper/Container
			var thumbWrapper = document.createElement('div');
			thumbWrapper.classList.add(gJs.thumbWrapperClass);
			container.appendChild(thumbWrapper);
			var thumbContainer = document.createElement('div');
			thumbContainer.classList.add(gJs.thumbContainerClass);
			thumbWrapper.appendChild(thumbContainer);
			var thumbOverflow = document.createElement('div');
			thumbOverflow.classList.add(gJs.thumbOverflowClass);
			thumbContainer.appendChild(thumbOverflow);
			var thumbContainerWidth = wrapperWidth - (gJs.arrowWidth * 2);
			thumbContainer.style.width = thumbContainerWidth + 'px';
			thumbContainer.style.marginLeft = gJs.arrowWidth + 'px';
		// Creating the Thumbnails
			for(thumbIndex = 0; thumbIndex < galleryImages.length; thumbIndex++) {
				var thumbSource = galleryImages[thumbIndex];
				var thumb = document.createElement('div');
				thumb.classList.add(gJs.thumbClass);
				// Adding the Current Class
					if(thumbIndex === 0) {
						thumb.classList.add(gJs.currentClass);
					}
				thumbOverflow.appendChild(thumb);
				var thumbImage = document.createElement('img');
				thumbImage.setAttribute('src', thumbSource);
				thumbImage.setAttribute('width', 120);
				thumbImage.setAttribute('height', 68);
				thumb.appendChild(thumbImage);
				thumbImagesWidth = thumbImagesWidth + thumbImage.clientWidth;
				// galleryThumbImages.push(thumb);
			}

		// Adjusting the Size of the Thumb Container
			thumbOverflow.style.width = thumbImagesWidth+'px';
		// Creating the Thumbnail Arrows
			for(thumbArrowIndex = 0; thumbArrowIndex < 2; thumbArrowIndex++) {
				var thumbArrow = document.createElement('div');
				thumbArrow.classList.add(gJs.thumbArrowClass);
				thumbWrapper.appendChild(thumbArrow);
				var thumbArrowLink = document.createElement('a');
				thumbArrowLink.classList.add(gJs.arrowLinkClass);
				thumbArrow.appendChild(thumbArrowLink);
				var thumbArrowIcon = document.createElement('i');
				thumbArrowIcon.classList.add(gJs.arrowIconClass);
				thumbArrowIcon.classList.add(gJs.arrowLinkIconClass);
				thumbArrowLink.appendChild(thumbArrowIcon);
				if(thumbArrowIndex === 0) {
					thumbArrow.classList.add(gJs.arrowLeftClass);
					thumbArrowIcon.classList.add(gJs.arrowIconLeftClass);
				} else {
					thumbArrow.classList.add(gJs.arrowRightClass);
					thumbArrowIcon.classList.add(gJs.arrowIconRightClass);
				}
			}	

	// Config: The Gallery Arrows
		var arrowContainer = document.createElement('div');
		arrowContainer.classList.add(gJs.galleryNavContainer);
		gallery.appendChild(arrowContainer);
		for(arrowIndex = 0; arrowIndex < 2; arrowIndex++) {
			var arrow = document.createElement('div');
			arrow.classList.add(gJs.arrowClass);
			arrowContainer.appendChild(arrow);
			var arrowLink = document.createElement('a');
			arrowLink.classList.add(gJs.arrowLinkClass);
			arrow.appendChild(arrowLink);
			var arrowIcon = document.createElement('i');
			arrowIcon.classList.add(gJs.arrowIconClass);
			arrowIcon.classList.add(gJs.arrowLinkIconClass);
			arrowLink.appendChild(arrowIcon);
			if(arrowIndex === 0) {
				arrow.classList.add(gJs.arrowLeftClass);
				arrowIcon.classList.add(gJs.arrowIconLeftClass);
			} else {
				arrow.classList.add(gJs.arrowRightClass);
				arrowIcon.classList.add(gJs.arrowIconRightClass);
			}
		}
	// Config: Readjust Gallery Size
		gJs.updateGallerySize = function() {
			var galleryWrapperHeight = galleryWrapper.clientHeight;
			var galleryHeight = gallery.clientHeight;
			var thumbWrapperHeight = thumbWrapper.clientHeight;
			galleryWrapper.style.height = (galleryHeight + thumbWrapperHeight) + 'px';
		};
	// Config: Initialization Stack
		gJs.galleryInitStack = function() {
			gJs.updateGallerySize();
		};

	gJs.galleryInitStack();

	// Action: Change Slide
		galleryJsChangeSlideTo = function(slider, slideIndex) {
			var newImageSource = galleryImages[slideIndex];
			var image = slider.getElementsByTagName('img')[0];
			image.setAttribute('src',newImageSource);
			var galleryThumbs = slider.parentNode.getElementsByClassName(gJs.thumbClass);
			for(var i = 0; i < galleryThumbs.length; i++) {
				var thumb = galleryThumbs[slideIndex];
				var siblings = thumb.parentNode.childNodes;
				for(var i = 0; i < siblings.length; i++) {
					var sib = siblings[i];
					sib.classList.remove(gJs.currentClass);
				}
				thumb.classList.add(gJs.currentClass);
			}
		}

	// Action: Previous Slide
		galleryJsPreviousSlide = function(slider) {
			settings.stepCount = settings.stepCount - 1;
			if(settings.stepCount <= -1) {
				settings.stepCount = 0;
			} else {
				galleryJsChangeSlideTo(slider, settings.stepCount);				
			}
		}

	// Action: Next Slide
		galleryJsNextSlide = function(slider) {
			settings.stepCount = settings.stepCount + 1;
			if(settings.stepCount >= settings.slideCount) {
				settings.stepCount = settings.slideCount - 1;
			} else {
				galleryJsChangeSlideTo(slider, settings.stepCount);	
			}			
		}

	// Click Action: Current Slide
		arrowContainer.addEventListener('click', function(){
			var gallerySlider = this.parentNode.parentNode;
			galleryJsNextSlide(gallerySlider);
		}, false);

	// Click Action: Previous Slide
		var galleryPrevClick = gallery.getElementsByClassName(gJs.arrowLeftClass)[0];
		galleryPrevClick.addEventListener('click', function(){
			event.stopPropagation();
			var gallerySlider = this.parentNode.parentNode;
			galleryJsPreviousSlide(gallerySlider);
		}, false);

	// Click Action: Next Slide
		var galleryNextClick = gallery.getElementsByClassName(gJs.arrowRightClass)[0];
		galleryNextClick.addEventListener('click', function(){
			event.stopPropagation();
			var gallerySlider = this.parentNode.parentNode;
			galleryJsNextSlide(gallerySlider);
		}, false);

	// Click Action: Change Slide on Thumbnail Click
		for(var i = 0; i < galleryThumbImages.length; i++) {
			var thumb = galleryThumbImages[i];
			thumb.addEventListener('click', function(){
				var index = galleryThumbImages.indexOf(this);
				settings.stepCount = index;
				galleryJsChangeSlideTo(index);
			}, false);
		}
	// Key Press Action: Left and Right Keys
		if(options.keyboardNav === true) {
			document.onkeydown = checkKey;
			function checkKey(e) {
				e = e || window.event;
				if (e.keyCode == '37') {
					galleryJsPreviousSlide();
				}
				else if (e.keyCode == '39') {
					galleryJsNextSlide();
				}
			}			
		}
	console.log(settings);
	console.log(galleryImages);
	console.log(settings.stepCount);
}

var galleries = document.getElementsByClassName('gallery-js');
for(i = 0; i < galleries.length; i++) {
	galleryJs(galleries[i], {
		imgWidth: 960,
		imgHeight: 480,
		keyboardNav: true
	});
}
