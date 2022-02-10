export const permissions = {
    projects: {
      create: "projects:create",
      delete: "projects:delete",
      users: {
        invite: "projects:users:invite",
        read: "projects:users:read",
        delete: "projects:users:delete",
      },
      roles: {
        update: "projects:roles:update",
      },
      stats: {
        read: "project:stats:read",
      },
      settings: {
        read: "projects:settings:read",
        update: "projects:settings:update",
      },
      security: {
        read: "projects:security:read",
        update: "projects:security:update",
      },
    },
    ipfs: {
      pins: {
        read: "ipfs:pins:read",
        delete: "ipfs:pins:delete",
      },
    },
    account: {
      delete: "account:delete",
      billing: {
        read: "account:billing:read",
        update: "account:billing:update",
      },
      settings: {
        read: "account:settings:read",
      },
    },
  };
  
  export const actions = [
    permissions.projects.create,
    permissions.projects.delete,
    permissions.projects.users.invite,
    permissions.projects.users.read,
    permissions.projects.users.delete,
    permissions.projects.roles.update,
    permissions.projects.stats.read,
    permissions.projects.settings.read,
    permissions.projects.settings.update,
    permissions.projects.security.read,
    permissions.projects.security.update,
    permissions.ipfs.pins.read,
    permissions.ipfs.pins.delete,
    permissions.account.delete,
    permissions.account.billing.read,
    permissions.account.billing.update,
    permissions.account.settings.read,
  ];
  
  export const roleActions: Record<string, string[]> = {
    owner: [
      permissions.projects.create,
      permissions.projects.delete,
      permissions.projects.users.invite,
      permissions.projects.users.read,
      permissions.projects.users.delete,
      permissions.projects.roles.update,
      permissions.projects.stats.read,
      permissions.projects.settings.read,
      permissions.projects.settings.update,
      permissions.projects.security.read,
      permissions.projects.security.update,
      permissions.ipfs.pins.read,
      permissions.ipfs.pins.delete,
      permissions.account.delete,
      permissions.account.billing.read,
      permissions.account.billing.update,
      permissions.account.settings.read,
    ],
    admin: [
      permissions.projects.create,
      permissions.projects.delete,
      permissions.projects.users.invite,
      permissions.projects.users.read,
      permissions.projects.users.delete,
      permissions.projects.roles.update,
      permissions.projects.stats.read,
      permissions.projects.settings.read,
      permissions.projects.settings.update,
      permissions.projects.security.read,
      permissions.projects.security.update,
      permissions.ipfs.pins.read,
      permissions.ipfs.pins.delete,
    ],
    contributor: [
      permissions.projects.stats.read,
      permissions.projects.settings.read,
      permissions.ipfs.pins.read,
      permissions.ipfs.pins.delete,
    ],
  };
  