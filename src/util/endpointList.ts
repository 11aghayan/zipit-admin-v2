export default {
  categoryRoutes: [
    {
      method: 'GET',
      label: 'Get All Categories (Both Languages)',
      route: '/api/v1/categories/admin',
      isProtected: true
    },
    {
      method: 'GET',
      label: 'Get All Categories (Single Language)',
      route: '/api/v1/categories/{language}',
      isProtected: false
    },
    {
      method: 'POST',
      label: 'Add a Category',
      route: '/api/v1/categories/',
      isProtected: true
    },
    {
      method: 'PUT',
      label: 'Edit a Category',
      route: '/api/v1/categories/{id}',
      isProtected: true
    },
    {
      method: 'DELETE',
      label: 'Delete a Category',
      route: '/api/v1/categories/{id}',
      isProtected: true
    },
  ],
  itemRoutes: [
    {
      method: 'GET',
      label: 'Get All Items (Both Languages)',
      route: '/api/v1/items/admin',
      isProtected: true
    },
    {
      method: 'GET',
      label: 'Get All Items (Single Languages)',
      route: '/api/v1/items/{language}',
      isProtected: false
    },
    {
      method: 'GET',
      label: 'Get an Item by ID (Both Languages)',
      route: '/api/v1/items/item/{itemId}',
      isProtected: true
    },
    {
      method: 'GET',
      label: 'Get an Item by ID (Single Language)',
      route: '/api/v1/items/{language}/{itemId}',
      isProtected: false
    },
    {
      method: 'GET',
      label: 'Get Random Items (Single Language)',
      route: '/api/v1/items/{language}/random',
      isProtected: false
    },
    {
      method: 'POST',
      label: 'Add an Item',
      route: '/api/v1/items/',
      isProtected: true
    },
    {
      method: 'POST',
      label: 'Get Similar Items',
      route: '/api/v1/items/:lang/similar',
      isProtected: false
    },
    {
      method: 'PUT',
      label: 'Edit an Item',
      route: '/api/v1/items/item/{itemId}',
      isProtected: true
    },
    {
      method: 'DELETE',
      label: 'Delete an Item',
      route: '/api/v1/items/item/{itemId}',
      isProtected: true
    },
  ],
  authRoutes: [
    {
      method: 'GET',
      label: 'Refresh Access Token',
      route: '/api/v1/auth/refresh',
      isProtected: false
    },
    {
      method: 'GET',
      label: 'Log Out',
      route: '/api/v1/auth/logout',
      isProtected: false
    },
    {
      method: 'POST',
      label: 'Log In',
      route: '/api/v1/auth/login',
      isProtected: false
    },
    {
      method: 'PUT',
      label: 'Change Password',
      route: '/api/v1/auth/',
      isProtected: true
    },
  ]
};