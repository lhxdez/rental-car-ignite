import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({
    name: "NodeJS",
    // duration: 10,
    educator: "Lucas",
  });

  CreateCourseService.execute({
    name: "ReactJs",
    // duration: 10,
    educator: "Lucas",
  });

  return res.send();
}

// import { Request, response, Response } from "express";
// import CreateCourseService from "./CreateCourseService";

// export function createCourse(req: Request, res: Response) {
//   CreateCourseService.execute("NodeJS", 10, "Lucas");

//   return response.send();
// }
