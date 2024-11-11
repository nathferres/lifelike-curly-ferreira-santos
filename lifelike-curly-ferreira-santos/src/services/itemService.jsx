// src/services/itemService.js
export function getItems(categoryId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const allItems = [
          { id: 1, title: 'Item 1', description: 'Descrição do Item 1', price: 100, pictureUrl: 'https://via.placeholder.com/150' },
          { id: 2, title: 'Item 2', description: 'Descrição do Item 2', price: 200, pictureUrl: 'https://via.placeholder.com/150' },
          { id: 3, title: 'Item 3', description: 'Descrição do Item 3', price: 300, pictureUrl: 'https://via.placeholder.com/150' },
        ];
        if (categoryId) {
          resolve(allItems.filter(item => item.title.toLowerCase().includes(categoryId.toLowerCase())));
        } else {
          resolve(allItems);
        }
      }, 2000);
    });
  }
  