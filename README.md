# > EndlessM 🕳️

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Getting Started

To view my website online, visit [endlessm.ca](https://endlessm.ca/)

To run this project locally:

1. Clone this repository: `git clone https://github.com/techmengg/tms-main-siteq.git`
2. Open the project folder in your code editor.
3. Open `index.html` in your web browser.

## Preview

![Screenshot 2024-05-11 173747](https://github.com/techmengg/tms-main-siteq/assets/125338813/9dcda60b-93d4-43c7-a65a-515f1db32601)

## Code Structure | main.js

This part of the code handles the scrolling functionality when clicking on navigation links (#navbar .nav-link). It smoothly scrolls to the corresponding section of the webpage and highlights the active section in the navigation bar.
```javascript
//Functionality to handle smooth scrolling and section highlighting when clicking on navigation links
on('click', '#navbar .nav-link', function(e) { 
  let section = select(this.hash); // Retrieve the target section based on the clicked link's hash
  
  if (section) { // Check if the target section exists
    e.preventDefault(); // Prevent the default action (navigating to a new page)

    // Select necessary elements
    let navbar = select('#navbar');
    let header = select('#header');
    let sections = select('section', true);
    let navlinks = select('#navbar .nav-link', true);

    // Remove the 'active' class from all navigation links
    navlinks.forEach((item) => {
      item.classList.remove('active');
    });

    // Add the 'active' class to the clicked navigation link, highlighting it as active
    this.classList.add('active');

    // Toggle the mobile navigation menu if it's open
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      let navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.toggle('bi-list');
      navbarToggle.classList.toggle('bi-x');
    }

    // Adjust header and section classes based on whether the target section is the header or not
    if (this.hash == '#header') { // If the target section is the header
      header.classList.remove('header-top'); // Remove the 'header-top' class from the header
      sections.forEach((item) => { // Remove the 'section-show' class from all sections
        item.classList.remove('section-show');
      });
      return; 
    }

    // If the target section is not the header
    if (!header.classList.contains('header-top')) { // If the header does not have the 'header-top' class
      header.classList.add('header-top'); // Add the 'header-top' class to the header
      setTimeout(function() { 
        sections.forEach((item) => { // Remove the 'section-show' class from all sections
          item.classList.remove('section-show');
        });
        section.classList.add('section-show'); // Add the 'section-show' class to the target section

      }, 350); // Delay in milliseconds
    } else { 
      sections.forEach((item) => { // Remove the 'section-show' class from all sections
        item.classList.remove('section-show');
      });
      section.classList.add('section-show'); // Add the 'section-show' class to the target section
    }

    scrollto(this.hash); // Scroll to the target section
  }
}, true); // Use capturing phase for the event listener
```
This functionality improves user experience by providing seamless navigation within the webpage, enhancing readability and engagement.

## License


This project is licensed under the [MIT License](LICENSE).
