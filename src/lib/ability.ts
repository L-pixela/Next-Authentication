import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability'
import type { Role } from '@/src/types/auth'

type AppSubjects = 'Warranty' | 'User' | 'all'
type AppActions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = MongoAbility<[AppActions, AppSubjects]>

export function defineAbilityFor(role: Role | 'unknown'): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (role === 'admin') {
    can('manage', 'all')
  } else if (role === 'customer') {
    can('read', 'Warranty')
    can('create', 'Warranty')
    can('read', 'User')
    cannot('delete', 'Warranty')
    cannot('update', 'User')
  } else {
    cannot('manage', 'all')
  }

  return build()
}
