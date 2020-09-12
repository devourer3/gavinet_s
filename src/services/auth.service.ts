import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {CreateUserDto} from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import {DataStoredInToken, TokenData} from '../interfaces/auth.interface';
import {User} from '../interfaces/users.interface';
import userModel from '../models/users.model';
import {isEmptyObject} from '../utils/util';

class AuthService {
  public users = userModel;

  public async anonymousLogin(data: AnonymousInterface): Promise<string> {
    // const hashedCorp = await bcrypt.hash(data.corpName, 10);
    if (isEmptyObject(data)) throw new HttpException(400, "You're not userData");
    // const isValid:boolean = await bcrypt.compare(process.env.PASSWD, hashedCorp);
    const isValid: boolean = data.corpName === process.env.PASSWD;
    if (!isValid) throw new HttpException(409, "인증 실패");
    const tokenData = this.createAnonymousToken(data);
    return this.createCookie(tokenData);
    // const tokenData = this.createToken(findUser);
    // const cookie = this.createCookie(tokenData);
  }

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({email: userData.email});
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.users.create({...userData, password: hashedPassword});
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: User }> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({email: userData.email});
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return {cookie, findUser};
  }

  public async logout(userData: User): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({password: userData.password});
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = {_id: user._id};
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60; // 1시간
    return {expiresIn, token: jwt.sign(dataStoredInToken, secret, {expiresIn})};
  }

  public createAnonymousToken(anonymous: AnonymousInterface): TokenData {
    const dataStoredInToken: DataStoredInToken = {_id: anonymous.corpName};
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60; // 1시간
    return {expiresIn, token: jwt.sign(dataStoredInToken, secret, {expiresIn})};
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
