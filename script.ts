import { PrismaClient } from "@prisma/client";
import { newEnforcer } from "casbin";
import { PrismaAdapter } from "casbin-prisma-adapter";
import arg from "arg";

const prisma = new PrismaClient();

const args = arg({});

// A `main` function so that you can use async/await
async function main() {
  const [method, ...params] = args._;
  const adapter = await PrismaAdapter.newAdapter(prisma);
  const enforcer = await newEnforcer("rbac_model.conf", adapter);

  const result = await (enforcer as any)[method](...params);

  console.log(result);
}

async function enforce(action: string) {
  const adapter = await PrismaAdapter.newAdapter(prisma);
  const enforcer = await newEnforcer("rbac_model.conf", adapter);
  return async (req: any, res: any, next: Function) => {
    const { id } = req.user;
    const { projectId } = req.params;
    // const allowed = await teams.enforce(id, projectId, action)
    // POST teams.infura.io/authz [{ sub: id, obj: projectId, action: action  }, { sub: id, obj: projectId, action: action  }]
    // [true, false]
    // results.every(Boolean)
    const roles = await enforcer.getRolesForUser(id, projectId);
    const actions = await prisma.action.findMany({ where: { id: action } });

    // if(roles in actions) {
    //   next()
    // } else res.status(403).json({})
  };

  // PUT /invitations/:inviteId/accept
  const objId = 'projectId' // that you were invited to
  const role = await prisma.role.findUnique({
    where: { id: "admin" },
    include: { actions: true },
  });
  enforcer.addRoleForUser('subject id', 'admin', objId)
}

// router.get('/project/:projectId/settings', getUser, enforce(['projects:settings:read', 'projects:settings:update']), (req,res) => res.json({}))

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// POST /authz { sub obj action }
// POST /invite
// GET /users/:userId/invitations
// DEL /invitations/:inviteId
// GET /projects/:id/
// GET /roles
// GET /actions

// roles = teams.getRoles()

// roles.map(() => )

// GET /me
//     req.user.grants = grants
// domains -> actions

type Grants = Record<string, string[]>;

const grants: Grants = {
  project1: ["project:settings:read"],
};


// infura.io/invitations/accept?token=oaisdohdasohdohdasohda -> { invitationId: "aoisdodhasohd" }
// /api/teams/invitations/:id -> { id: '', role: '', projectId: ''}
// Click button to accept
// /api/teams/invitations/:id/accept -> { id: '', role: '', projectId: '', product: ''}
// redirect /projects/:projectId
