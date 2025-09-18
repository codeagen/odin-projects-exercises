// Home module
const homeModule = {
    createHomePage: function() {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page-content';
        
        const heroSection = document.createElement('div');
        heroSection.className = 'hero-section';
        
        const title = document.createElement('h1');
        title.className = 'hero-title';
        title.textContent = 'Chicken Republic Restaurant';
        
        const subtitle = document.createElement('h2');
        subtitle.className = 'hero-subtitle';
        subtitle.textContent = 'Authentic Delicious Chicken Since 1952';
        
        // Create a placeholder image using CSS gradient
        const heroImage = document.createElement('img');
        heroImage.className = 'hero-image';
        heroImage.src = 'images/restaurant.jpg'
        heroImage.alt = 'Restaurant Interior';
        // heroImage.style.background = 'linear-gradient(45deg, #ff9a9e, #fecfef), url("data:image/svg+xml,%3Csvg width=\'600\' height=\'300\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f8f9fa\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'24\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23495057\'%3ERestaurant Interior%3C/text%3E%3C/svg%3E")';
        // heroImage.style.backgroundSize = 'cover';
        // heroImage.style.backgroundBlendMode = 'overlay';
        
        const description = document.createElement('p');
        description.className = 'description';
        description.innerHTML = `
        Welcome to Chicken Republic, where rich Nigerian flavors meet modern dining. 
        For decades, we’ve been proudly serving meals that bring people together — from spicy jollof rice to crispy chicken and comforting local favorites. 
        Every dish is prepared with passion, seasoned with authentic spices, and cooked with the freshest ingredients sourced from our land. 
        Come experience the true taste of Nigeria in a warm and vibrant atmosphere that celebrates family, tradition, and togetherness.

        `;
        
        heroSection.appendChild(title);
        heroSection.appendChild(subtitle);
        heroSection.appendChild(heroImage);
        heroSection.appendChild(description);
        
        pageDiv.appendChild(heroSection);
        return pageDiv;
    }
};