import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createNews(@Body() news: CreateNewsDto) {
    return await this.newsService.createNews(news);
  }

  @Get()
  async getNews() {
    return this.newsService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/edit')
  async updateNews(@Body() news: UpdateNewsDto) {
    return this.newsService.updateNews(news);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteNews(@Query('id', ParseIntPipe) id: number) {
    return this.newsService.deleteNews(id);
  }
}
