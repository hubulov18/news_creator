import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}
  private create = this.prisma.news.create;
  private findAll = this.prisma.news.findMany;
  private delete = this.prisma.news.delete;
  private update = this.prisma.news.update;
  async getAll() {
    return this.findAll();
  }

  async createNews(news: CreateNewsDto) {
    return this.create({ data: { ...news } });
  }

  async deleteNews(id: number) {
    return this.delete({ where: { id } });
  }

  async updateNews(news: Partial<UpdateNewsDto>) {
    return this.update({ where: { id: news.id }, data: { ...news } });
  }
}
