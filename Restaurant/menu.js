// Menu module
const menuModule = {
    createMenuPage: function() {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page-content';
        
        const title = document.createElement('h1');
        title.className = 'hero-title';
        title.textContent = 'Our Menu';
        title.style.textAlign = 'center';
        title.style.marginBottom = '2rem';
        
        const menuGrid = document.createElement('div');
        menuGrid.className = 'menu-grid';
        
        // Appetizers
        const appetizers = this.createMenuCategory('Appetizers', [
            { name: 'Pepper Soup', desc: 'Spicy broth with assorted meat or fish', price: '₦2500' },
            { name: 'Suya Skewers', desc: 'Grilled beef skewers with yaji spice mix', price: '₦2000' },
            { name: 'Moi Moi', desc: 'Steamed bean pudding with fish or egg', price: '₦1500' }
        ]);
        
        // Main Courses
        const mains = this.createMenuCategory('Main Courses', [
            { name: 'Jollof Rice & Chicken', desc: 'Smoky party-style jollof served with grilled chicken', price: '₦4000' },
            { name: 'Pounded Yam & Egusi Soup', desc: 'Rich melon seed soup served with fluffy pounded yam', price: '₦3500' },
            { name: 'Ofada Rice & Ayamase', desc: 'Local ofada rice served with spicy green pepper sauce', price: '₦3800' }
        ]);
        
        // Desserts
        const desserts = this.createMenuCategory('Desserts', [
            { name: 'Puff Puff', desc: 'Golden fried dough balls, lightly sugared', price: '₦800' },
            { name: 'Chin Chin', desc: 'Crispy fried pastry bites with a sweet crunch', price: '₦1000' },
            { name: 'Zobo Drink', desc: 'Refreshing hibiscus drink spiced with ginger and cloves', price: '₦1200' }
        ]);
        
        menuGrid.appendChild(appetizers);
        menuGrid.appendChild(mains);
        menuGrid.appendChild(desserts);
        
        pageDiv.appendChild(title);
        pageDiv.appendChild(menuGrid);
        
        return pageDiv;
    },
    
    createMenuCategory: function(categoryName, items) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = categoryName;
        categoryDiv.appendChild(categoryTitle);
        
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            
            const itemName = document.createElement('h4');
            itemName.innerHTML = `${item.name} <span class="price">${item.price}</span>`;
            
            const itemDesc = document.createElement('p');
            itemDesc.textContent = item.desc;
            
            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemDesc);
            categoryDiv.appendChild(itemDiv);
        });
        
        return categoryDiv;
    }
};
