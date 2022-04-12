const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');


const user = require('../model/User');
//const Admin = require('../model/Admin');
const pending_users = require('../model/pending-users');
const resetAccounts = require('../model/resetAccount');

AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
    
    resources: [user,pending_users,resetAccounts],
    rootPath: '/admin',
    branding: {
      companyName: 'Avalanche',
      softwareBrothers: false,   // if Software Brothers logos should be shown in the sidebar footer
    },
};
const ADMIN = {
  email: 'admin',
  password: 'admin',
}

  const adminBro = new AdminBro(AdminBroOptions);
  //const router = AdminBroExpress.buildRouter(adminBro);
  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: 'adminBro',	
    cookiePassword: 'testtest',
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
      }
        return null
      },
    }, null, { 
      resave: false,	
      saveUninitialized: true,	
  });
module.exports= router;