interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ name, duration = 8, educator }: Course) {
    console.log(duration, educator, name);
  }
}

export default new CreateCourseService();

// class CreateCourseService {
//   execute(name: string, duration: number, educator: string) {
//     console.log(duration, educator, name);
//   }
// }

// export default new CreateCourseService();
