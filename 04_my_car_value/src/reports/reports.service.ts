import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);

    report.user = user; // this is how we associate a report with a user, behind the scenes it sets the user_id column

    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;

    return this.repo.save(report);
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder() // this is how we create a custom query with TypeORM
      .select('AVG(price)', 'price') // select the average price
      .where('make = :make', { make }) // filter by make
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng }) // difference between the longitude of the car and the one we are comparing with should be between -5 and 5
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat }) // difference between the latitude of the car and the one we are comparing with should be between -5 and 5
      .andWhere('year - :year BETWEEN -3 AND 3', { year }) // difference between the year of the car and the one we are comparing with should be between -3 and 3
      .andWhere('approved IS TRUE') // only approved reports
      .orderBy('ABS(mileage - :mileage)', 'DESC') // order by the difference between the mileage of the car and the one we are comparing with
      .setParameters({ mileage }) // set the mileage parameter for the query builder
      .limit(3) // limit the results to 3
      .getRawOne(); // get the result as a raw object
  }
}
