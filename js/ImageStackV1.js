var scrollval;
var ImgNameArray = [];
var ImageCount = 17;

for (var i=0; i<ImageCount; i++) {
    ImgNameArray[i] = i+'.jpg';
}

var imageList = getImageListV1('img/', ImgNameArray.length,ImgNameArray);

var stack = new ImageStack({ images: imageList, height: '20rem' , width: '30rem'  });


$('#ImgAnimated').append(stack);

function getImageListV1(root_path, num_imgs,names_imgs) {
    console.log(names_imgs);
    images = []
    for (i = 0 ; i < num_imgs; i++){
        var p = root_path  + names_imgs[i]
        images.push(p)
    }
    return images
}


function getStack(images){
    var stack = new ImageStack({
        images: images,
        height: '30rem',
        width: '30rem'
    });
    return stack
}

function ImageStack (options) {

    var self = this;

    self.img_array = options.images;

    self.stack = document.createElement('div');
    self.stack.className = 'custom-scroll text-center';
    self.stack.style.overflow = 'auto';
    self.stack.style.maxWidth = '100%';
    self.stack.style.height = options.height;
    self.stack.style.width = options.width;
    self.stack.style.backgroundSize = 'cover'
    self.stack.style.position = 'relative';

    var typeRegex = /(\D+)/
    var sizeType = options.height.match(typeRegex)[0]

    var numberRegex = /(\d+)/
    self.height_number = Number( options.height.match(numberRegex)[0] )

    self.wrapper = document.createElement('div');

    for (var i = 0; i < self.img_array.length; i++) {

        var image = document.createElement('img');
        image.src = self.img_array[i];

        image.style.display = 'none';
        image.style.position = 'absolute';
        image.style.width = options.width;
        image.style.height = options.height;
        image.style.top = 0;
        image.style.left = 0;
        image.dataset.iid = i;

        self.wrapper.appendChild(image);

    }

    self.image_elements = self.wrapper.querySelectorAll('img');

    self.scrollobject = document.createElement('div');
    self.scrollobject.style.width = '100%';
    self.scrollobject.style.position = 'absolute';
    self.scrollobject.style.zIndex = '2';
    self.img_count = (self.img_array.length > 15) ? self.img_array.length : 15;
    self.scrollobject_height = Math.floor( 0.1 * self.img_count * self.height_number );

    self.scrollobject.style.height = self.scrollobject_height + sizeType;

    self.scrollUpdate = function (e) {

        self.height_number = self.stack.getBoundingClientRect().height
        self.scrollobject_height = Math.floor( 0.1 * self.img_count * self.height_number );

        var sT = self.stack.scrollTop
        var hn05 = self.img_array.length - 1
        var hh = (self.scrollobject_height - self.height_number) / hn05
        scrollval = Math.floor(sT / (hh))

        self.currentimg = self.image_elements[scrollval].src

        imageScrolled = self.currentimg

        self.stack.style.backgroundImage = 'url(' + self.currentimg + ')';

    }

    self.stack.addEventListener('scroll', self.scrollUpdate);

    self.currentimg = self.image_elements[0].src
    self.stack.style.backgroundImage = 'url(' + self.currentimg + ')';

    /*

    window.addEventListener('resize', function () {
      var stackRect = self.stack.getBoundingClientRect()

      console.log(stackRect)

      self.height_number = stackRect.height
      self.scrollobject_height = Math.floor( 0.1 * self.img_array.length * self.height_number );

      self.stack.style.width = stackRect.width + 'px'
      self.stack.style.eight = stackRect.width + 'px'
    })

    */

    self.stack.appendChild(self.wrapper);
    self.stack.appendChild(self.scrollobject);

    return self.stack;

}

/*

The function ImageStack returns a Element Node, which can be appended to an already existing element or modified, however someone wants to change it.

The parameters should have to be a height of the element, the width of the elment, and a list (Array) to all the images.

*/


// ******************************************************************************
/*var ImgNameArray =  ["0.jpg","1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg","16.jpg"] ;


console.log(ImgNameArray);
console.log(ImgNameArray.length);*/

// ********************************************************************************************

// ******************** from the list of files, we get the images  *********************************
//  var imageList = getImageListV2('action1V2', 7,[1,2,3,4,5,6,7]);
