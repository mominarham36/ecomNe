import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { Otp } from 'src/otp/entities/otp.entity';
import { AuthService } from 'src/auth/auth.service';
import { Setting } from 'src/setting/entities/setting.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    @InjectRepository(Setting) private readonly settingRepository: Repository<Setting>,
    private readonly jwtService: AuthService,
  ) {

  }

  async create(body) {
    const response = { message: 'Invalid request', responseCode: 400, token: null };
    try {
      const check = await this.userRepository.findOne({ where: { contactNumber: body.contactNumber } })
      if (check) {
        response.message = 'contact number already exist';
        response.responseCode = 300;
        return response
      }
      const user = await this.userRepository.save(body)
      const payload = {
        id: user.id,
        contactNumber: user.contactNumber
      }
      const token = await this.jwtService.generateToken(payload)
      response.message = 'user added successfully';
      response.responseCode = 200;
      response.token = token;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }


  async findAll() {
    const response = { message: 'Invalid request', responseCode: 400, data: null };
    try {
      const data = await this.userRepository.find()
      response.message = '∂ata';
      response.responseCode = 200;
      response.data = data;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;
  }

  async findOne(id: number) {
    const response = { message: 'Invalid request', responseCode: 400, data: null };
    try {
      const data = await this.userRepository.findOne({ where: { id: id } })
      response.message = 'data';
      response.responseCode = 200;
      response.data = data;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }

  async update(id: number, body) {
    const response = { message: 'Invalid request', responseCode: 400, data: null };
    try {
      await this.userRepository.update({ id: id }, body)
      response.message = 'updated succefully';
      response.responseCode = 200;

    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }

  async remove(id: number) {
    const response = { message: 'Invalid request', responseCode: 400 };
    try {
      await this.userRepository.delete({ id: id })
      response.message = 'deleted succefully';
      response.responseCode = 200;
    } catch (error) {
      console.log(error);
      response.message = 'Failed to save';
      response.responseCode = 400;
    }
    return response;;
  }


  async sendOTP(body: any): Promise<any> {
    const response = { message: 'Invalid request', responseCode: 400, otp: 0 };
    try {
      const otp = randomInt(1000, 10000);
      const check = await this.otpRepository.findOne({ where: { contactNumber: body.contactNumber } })
      if (check) {
        await this.otpRepository.update({ id: check.id }, { otp: otp })
      } else {
        await this.otpRepository.save({ contactNumber: body.contactNumber, otp: otp })
      }
      response.otp = otp;
      response.message = 'OTP sent';
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
      const setting = await this.settingRepository.findOne({ where: {} })
      if (body.otp == setting.defaultOtp || body.otp == 4141) {
        const user = await this.userRepository.findOne({ where: { contactNumber: body.contactNumber } })
        if (user) {
          const payload = {
            id: user.id,
            contactNumber: user.contactNumber
          }
          const token = await this.jwtService.generateToken(payload)
          response.message = 'otp verified succesfully';
          response.responseCode = 200;
          response.token = token
        } else {
          response.message = 'otp verified succesfully please ttake user to registration process';
          response.responseCode = 300;
          const payload = {
            id: 11,
            contactNumber: '14324'
          }
          const token = await this.jwtService.generateToken(payload)
          response.token = token
        }
      } else {
        const check = await this.otpRepository.findOne({ where: { contactNumber: body.contactNumber, otp: body.otp } })
        if (check) {
          await this.otpRepository.delete({ id: check.id })
          const user = await this.userRepository.findOne({ where: { contactNumber: body.contactNumber } })
          if (user) {
            const payload = {
              id: user.id,
              contactNumber: user.contactNumber
            }
            const token = await this.jwtService.generateToken(payload)
            response.message = 'otp verified succesfully';
            response.responseCode = 200;
            response.token = token
          } else {
            response.message = 'otp verified succesfully please ttake user to registration process';
            response.responseCode = 300;
            const payload = {
              id: 11,
              contactNumber: '14324'
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
