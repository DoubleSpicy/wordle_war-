const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');


const user = require('../model/User');

AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
    
    resources: [user],
    rootPath: '/admin',
};
  const adminBro = new AdminBro(AdminBroOptions);
  const router = AdminBroExpress.buildRouter(adminBro);

module.exports= router;