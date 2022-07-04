import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Role } from 'src/auth/types/enums/role.enum';

export class CreateUserDto {
  /**
   *The name of the user
   * @example Francisco
   */
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   *The name of the user
   * @example Francisco
   */
  @IsString()
  @IsNotEmpty()
  email: string;
  /**
   *The password of the user
   * @example Francisco
   */
  @IsString()
  @IsNotEmpty()
  password: string;
  /**
   *The plan of the user
   * @example ["standard"]
   */
  @IsNotEmpty()
  @IsArray()
  roles: Array<Role>;
}
