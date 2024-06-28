import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles) 


//UTILIZAR EL DECORADOR CON EL TIPO DE ROL PERMITIDO EN EL CONTROLLER ANTES DEL METODO
// EJ: Roles("admin")
// @UseGuard(RoleGuard)
// @Post() ....