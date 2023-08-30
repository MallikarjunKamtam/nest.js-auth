import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SinginDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
export declare class UsersController {
    private usersService;
    private authSerice;
    constructor(usersService: UsersService, authSerice: AuthService);
    signOut(session: any): string;
    create(createUserDto: CreateUserDto, session: any): Promise<import("./entities/user.entity").User>;
    singin(body: SinginDto, session: any): Promise<import("./entities/user.entity").User>;
    findAll(session: any): Promise<import("./entities/user.entity").User | import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
