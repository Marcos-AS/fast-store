import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index() {
    const viewData = [];
    viewData['title'] = 'Home Page - FastStore';
    return {
      viewData: viewData,
    };
  }

  @Get('/about')
  @Render('about')
  about() {
    const viewData = [];
    viewData['title'] = 'About us - FastStore';
    viewData['subtitle'] = 'About us';
    viewData['description'] = 'This is an about page...';
    viewData['author'] = 'Developed by: Marcos Santangelo';
    return {
      viewData: viewData,
    };
  }
}
