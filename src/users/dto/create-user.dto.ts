import { ApiProperty } from "@nestjs/swagger";

export class CreateUserkDto {
  @ApiProperty({ example: 'name' })
  readonly name;

  @ApiProperty({ example: 'email@mail.com' })
  readonly email;

  @ApiProperty({ example: 'password' })
  readonly artist;
}
