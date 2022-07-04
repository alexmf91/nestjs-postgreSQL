import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities';
import { Role } from 'src/auth/types/enums/role.enum';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', array: true })
  roles: Array<Role>;
}
