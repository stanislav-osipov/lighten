const api = 'https://randomuser.me/api/?results=50';

class Users {
  getList() {
    return fetch(api)
      .then(response => response.json())
      .then(data => {
        const list = data ? data.results || [] : [];
        
        return Promise.resolve(list);
      });
  }
}