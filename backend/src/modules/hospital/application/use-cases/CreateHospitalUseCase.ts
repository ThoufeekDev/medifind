import { BadRequestError } from '../../../../shared/exceptions/BadRequestError';
import { CloudinaryService } from '../../../../shared/services/cloudinary.service';
import type { Hospital } from '../../domain/entities/Hospital';

import { IHospitalRepository } from '../../domain/repositories/iHospitalRepository';

import { CreateHospitalDTO } from '../dtos/create-hospital.dto';

export class CreateHospitalUseCase {
  constructor(
    private hospitalRepository: IHospitalRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    data: CreateHospitalDTO,
    adminId: string,
    image?: Express.Multer.File,
  ): Promise<Hospital> {
    // Check Hospital Exists

    const exist = await this.hospitalRepository.existsByAdminId(adminId);

    if (exist) {
      throw new BadRequestError('Hospital already Exists');
    }

    // create Hospital

    let imageUrl: string = '';

    if (image) {
      imageUrl = await this.cloudinaryService.uploadImage(image.buffer, 'medifind/hospitals');
    }

    return this.hospitalRepository.create(
      {
        ...data,
        imageUrl,
      },

      adminId,
    );
  }
}
