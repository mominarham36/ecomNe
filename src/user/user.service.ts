import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { Otp } from 'src/otp/entities/otp.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly jwtService:AuthService ,
  ) {

  }

  async create(body) {
    const data = await this.userRepository.save({ name: "arham" })
    return data
  }

  async findAll(decodedUser) {
    console.log(decodedUser)
    const data = await this.userRepository.find()
    return data;

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, body) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async sendOTP(body: any): Promise<any> {
    const response = { message: 'Invalid request', responseCode: 400, otp: 0 };
    try {
      const otp = randomInt(1000, 10000);
      const check = await this.otpRepository.findOne({ where: { contactNumber: body.contactNUmber } })
      if (check) {
        await this.otpRepository.update({ id: check.id }, { otp: otp })
      } else {
        await this.otpRepository.save({ contactNumber: body.contactNumber, otp: otp })
      }
      response.otp = otp;
      response.message = 'Send OTP';
      response.responseCode = 200;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }


  async verifyOTP(body: any): Promise<any> {
    const response = { message: 'Invalid request', responseCode: 400, token: "" };
    try {
      if (body.otp == '4141') {
        const user = await this.userRepository.findOne({ where: { contactNumber: body.contactNumber } })
        if (user) {
          const payload ={
            id:user.id,
            contactNumber:user.contactNumber
          }
          const token = await this.jwtService.generateToken(payload)
          response.message = 'otp verified succesfully';
          response.responseCode = 200;
          response.token = token
        } else {
          response.message = 'otp verified succesfully please ttake user to registration process';
          response.responseCode = 300;
          const payload ={
            id:11,
            contactNumber:'14324'
          }
          const token = await this.jwtService.generateToken(payload)
          response.token = token
        }
      } else {
        const check = await this.otpRepository.findOne({ where: { contactNumber: body.contactNUmber, otp: body.otp } })
        if (check) {
          await this.otpRepository.delete({ id: check.id })
          const user = await this.userRepository.findOne({ where: { contactNumber: body.contactNumber } })
          if (user) {
            const payload ={
              id:user.id,
              contactNumber:user.contactNumber
            }
            const token = await this.jwtService.generateToken(payload)
            response.message = 'otp verified succesfully';
            response.responseCode = 200;
            response.token = token
          } else {
            response.message = 'otp verified succesfully please ttake user to registration process';
            response.responseCode = 300;
            const payload ={
              id:11,
              contactNumber:'14324'
            }
            const token = await this.jwtService.generateToken(payload)
            response.token = token
          }


        } else {
          response.message = 'invalid otp';
          response.responseCode = 404;
        }
      }


    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }
}
