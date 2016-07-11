'use strict';

import User from '../api/user/user.model';

User.count({role: 'admin'})
  .then(count => {
    if(count > 0) return;
    User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
      .then(() => {
        console.log('finished populating admin user');
      });

  });
