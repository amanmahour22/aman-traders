 // JavaScript function to handle the search
 function search() {
    // Get the search input value
    var searchTerm = document.getElementById('searchInput').value;
    
    // You can perform further actions with the search term, such as making an API request or manipulating the DOM.
    // For this example, we'll just log the search term to the console.
    console.log('Search term:', searchTerm);
  }

  var currentSlide = 0;

  function showSlide() {
    var track = document.querySelector('.slider-track');
    var slides = document.querySelectorAll('.slider-item');
    track.style.transform = 'translateX(' + (-currentSlide * slides[0].offsetWidth) + 'px)';
  }

  function nextSlide() {
    currentSlide = 1;
    showSlide();
  }

  function prevSlide() {
    currentSlide = 0;
    showSlide();
  }



      var currentSlide = 0;

    function showSlide() {
      var boxes = document.querySelectorAll('.box');
      boxes.forEach((box, index) => {
        var offset = currentSlide * (index + 1) * 120; // Adjusted for box width and spacing
        box.style.transform = 'translateX(' + offset + 'px)';
      });
    }

    function nextSlide() {
      currentSlide = 1;
      showSlide();
    }

    function prevSlide() {
      currentSlide = 0;
      showSlide();
    }


    function scrollToTop() {
        window.scrollTo({ top: 10, behavior: 'smooth' });
      }
  
      // JavaScript to show/hide the scroll-to-top arrow based on scroll position
      window.onscroll = function() {
        var scrollToTopButton = document.getElementById('scrollToTop');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopButton.style.display = 'block';
        } else {
          scrollToTopButton.style.display = 'none';
        }
      };


      function submitForm() {
        // You can add more validation or processing logic here
        // For simplicity, this example just logs the form data to the console
        var formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        console.log(formData);
    }
