import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }

  @Get("/bye")
  getByThere() {
    return "bye there!";
  }
}
