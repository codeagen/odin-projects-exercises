// Contact module
const contactModule = {
    createContactPage: function() {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page-content';
        
        const title = document.createElement('h1');
        title.className = 'hero-title';
        title.textContent = 'Contact Us';
        title.style.textAlign = 'center';
        title.style.marginBottom = '2rem';
        
        const contactInfo = document.createElement('div');
        contactInfo.className = 'contact-info';
        
        // Location card
        const locationCard = document.createElement('div');
        locationCard.className = 'contact-card';
        locationCard.innerHTML = `
            <h3>Location</h3>
            <p>123 Agidingbi Street</p>
            <p>Ikeja</p>
            <p>Lagos</p>
        `;
        
        // Hours card
        const hoursCard = document.createElement('div');
        hoursCard.className = 'contact-card';
        hoursCard.innerHTML = `
            <h3>Hours</h3>
            <p>Monday - Thursday: 11am - 10pm</p>
            <p>Friday - Saturday: 11am - 11pm</p>
            <p>Sunday: 12pm - 9pm</p>
        `;
        
        // Contact card
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <h3>Contact</h3>
            <p>Phone: +234 2346342987</p>
            <p>Email: muaadhadeleye@gmail.com</p>
            <p>Reservations:+234 2325252527</p>
        `;
        
        contactInfo.appendChild(locationCard);
        contactInfo.appendChild(hoursCard);
        contactInfo.appendChild(contactCard);
        
        pageDiv.appendChild(title);
        pageDiv.appendChild(contactInfo);
        
        return pageDiv;
    }
};