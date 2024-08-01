import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SettingService {

    constructor(
        @InjectRepository(Setting) private readonly repository: Repository<Setting>,
    ) {

    }

    async create(body) {
        const response = { message: 'Invalid request', responseCode: 400, token: null };
        try {
            if (/^\d{4}$/.test(body.defaultOtp)) {
                const setting = await this.repository.findOne({ where: {} })
                if (setting) {
                    await this.repository.update({ id: setting.id }, { defaultOtp: body.otp, maxQuantity: body.quantity })
                    response.message = 'data uppdated succefully'
                    response.responseCode = 200;
                } else {
                    await this.repository.save(body)
                    response.message = 'data saved succefully'
                    response.responseCode = 200;
                }

            } else {
                response.responseCode = 400;
                response.message = 'otp should be four digit';
            }

        } catch (error) {
            console.log(error);
            response.message = 'Failed to save';
            response.responseCode = 400;
        }
        return response;
    }
}
