import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SinginDto } from './dto/signin.dto';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    signUp(body: CreateUserDto): Promise<import("./entities/user.entity").User>;
    signIn(body: SinginDto): Promise<import("./entities/user.entity").User>;
}
