var gJs = {};
gJs.wrapperClass = 'gallery-js-wrapper';
gJs.containerClass = 'gallery-js-container';
gJs.imageClass = 'gjs-image';
gJs.imageWrapperClass = 'gjs-image-wrapper';
gJs.thumbWrapperClass = 'gjs-thumb-wrapper';
gJs.thumbContainerClass = 'gjs-thumb-container';
gJs.thumbClass = 'gjs-thumbnail';
gJs.thumbArrowClass = 'gjs-arrow';
gJs.arrowClass = 'gjs-arrow';
gJs.arrowLeftClass = 'arrow-left';
gJs.arrowRightClass = 'arrow-right';

gJs.imageSourceAttr = 'data-image-source';
gJs.imageIdAttr = 'data-image-id';
gJs.thumbAttr = 'data-gjs-thumb';

gJs.currentClass = 'current';

galleryJS = function(obj, option) {
	var imageIndex, thumbIndex, thumbArrowIndex, arrowIndex;
	var gallery = obj;

	// Defining the (API) Options
		var options = {};
		options.imgWidth = option.imgWidth;
		options.imgHeight = option.imgHeight;
		options.keyboardNav = option.keyboardNav;
		options.captions = option.captions;

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
		gallery.classList.add('gallery-js-overflow');
	// Defining Wrapper/Container Variables
		var wrapper = gallery.parentNode.parentNode;
		var container = gallery.parentNode;

	// Config: the Images
		var images = gallery.getElementsByClassName(gJs.imageClass);
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
			// Function: Wrapping Every Image in a Image Wrapper Div
				var wrapImage = function() {
					var imageWrapper = document.createElement('div');
					imageWrapper.classList.add(gJs.imageWrapperClass);
					imageWrapper.setAttribute(gJs.imageSourceAttr, source);
					imageWrapper.setAttribute(gJs.imageIdAttr, imageId)
					imageParent.insertBefore(imageWrapper, image);
					imageWrapper.appendChild(image);					
				}
			// Function: Creating the First Image
				var createImage = function(){
					if(imageIndex === 0 && image.tagName !== 'IMG') {
						var img = document.createElement('img');
						img.setAttribute('src', source);
						img.classList.add(gJs.currentClass);
						image.appendChild(img);
					}
				}
			// Function: Creating the Image Init Stack
				var initImage = function() {
					wrapImage();
					createImage();
				}
			// Function: Initiation
				initImage();
		}
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
		// Creating the Thumbnails
			for(thumbIndex = 0; thumbIndex < images.length; thumbIndex++) {
				var image = images[thumbIndex];
				var thumbSource = image.getAttribute(gJs.thumbAttr);
				var thumb = document.createElement('div');
				thumb.classList.add(gJs.thumbClass);
				// Adding the Current Class
					if(thumbIndex === 0) {
						thumb.classList.add(gJs.currentClass);
					}
				thumbContainer.appendChild(thumb);
				var thumbImage = document.createElement('img');
				thumbImage.setAttribute('src', thumbSource);
				thumbImage.setAttribute('width', 90);
				thumbImage.setAttribute('height', 60);
				thumb.appendChild(thumbImage);
				thumbImagesWidth = thumbImagesWidth + thumbImage.clientWidth;
			}
		// Adjusting the Size of the Thumb Container
			thumbContainer.style.width = thumbImagesWidth+'px';
		// Creating the Thumbnail Arrows
			for(thumbArrowIndex = 0; thumbArrowIndex < 2; thumbArrowIndex++) {
				var thumbArrow = document.createElement('div');
				thumbArrow.classList.add(gJs.thumbArrowClass);
				if(thumbArrowIndex === 0) {
					thumbArrow.classList.add(gJs.arrowLeftClass);
				} else {
					thumbArrow.classList.add(gJs.arrowRightClass);
				}
				thumbWrapper.appendChild(thumbArrow);
			}			
	// Config: The Gallery Arrows
		for(arrowIndex = 0; arrowIndex < 2; arrowIndex++) {
			var arrow = document.createElement('div');
			arrow.classList.add(gJs.arrowClass);
			if(arrowIndex === 0) {
				arrow.classList.add(gJs.arrowLeftClass);
			} else {
				arrow.classList.add(gJs.arrowRightClass);
			}
			container.appendChild(arrow);
		}
}

var galleries = document.getElementsByClassName('gallery-js');
for(i = 0; i < galleries.length; i++) {
	galleryJS(galleries[i], {
		imgWidth: 960,
		imgHeight: 540
	});
}
