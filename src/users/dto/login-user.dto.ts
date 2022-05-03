import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: 'email@mail.com' })
  readonly email;

  @ApiProperty({ example: 'password' })
  readonly password;
}
