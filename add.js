class Student {
    constructor(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.courses = {};
    }

    addCourse(course) {
        if (!this.courses[course]) {
            this.courses[course] = {
                grades: [],
                attendance: []
            };
        }
    }

    removeCourse(course) {
        if (this.courses[course]) {
            delete this.courses[course];
        }
    }

    addGrade(course, grade) {
        if (this.courses[course]) {
            this.courses[course].grades.push(grade);
        }
    }

    addAttendance(course, attended) {
        if (this.courses[course]) {
            this.courses[course].attendance.push(attended);
        }
    }

    getAverageGrade(course) {
        if (!this.courses[course] || this.courses[course].grades.length === 0) return 0;
        const sum = this.courses[course].grades.reduce((acc, grade) => acc + grade, 0);
        return sum / this.courses[course].grades.length;
    }

    getAverageAttendance(course) {
        if (!this.courses[course] || this.courses[course].attendance.length === 0) return 0;
        const attendedClasses = this.courses[course].attendance.filter(attended => attended).length;
        return attendedClasses / this.courses[course].attendance.length;
    }

    getInfo() {
        let info = `
            Ім'я: ${this.firstName}
            Прізвище: ${this.lastName}
            Рік народження: ${this.birthYear}
        `;
        for (const course in this.courses) {
            info += `
                Курс: ${course}
                Середня оцінка: ${this.getAverageGrade(course).toFixed(2)}
                Середнє відвідування: ${(this.getAverageAttendance(course) * 100).toFixed(2)}%
            `;
        }
        return info;
    }
}

class Group {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    removeStudent(firstName, lastName) {
        this.students = this.students.filter(student =>
            student.firstName !== firstName || student.lastName !== lastName);
    }

    getAttendanceRanking(course) {
        return this.students
            .map(student => ({
                student,
                averageAttendance: student.getAverageAttendance(course)
            }))
            .sort((a, b) => b.averageAttendance - a.averageAttendance)
            .map(({ student, averageAttendance }) => ({
                name: `${student.firstName} ${student.lastName}`,
                averageAttendance: (averageAttendance * 100).toFixed(2) + '%'
            }));
    }

    getGradeRanking(course) {
        return this.students
            .map(student => ({
                student,
                averageGrade: student.getAverageGrade(course)
            }))
            .sort((a, b) => b.averageGrade - a.averageGrade)
            .map(({ student, averageGrade }) => ({
                name: `${student.firstName} ${student.lastName}`,
                averageGrade: averageGrade.toFixed(2)
            }));
    }

    getAllStudentsInfo() {
        return this.students.map(student => student.getInfo()).join('\n');
    }
}


const group = new Group();

const student1 = new Student('Alina', 'Ovchynnykova', 2000);
const student2 = new Student('Julia', 'Tata', 2001);
const student3 = new Student('Igor', 'Sidrov', 1999);

student1.addCourse('Chemistry');
student1.addGrade('Chemistry', 90);
student1.addGrade('Chemistry', 85);
student1.addAttendance('Chemistry', true);
student1.addAttendance('Chemistry', true);

student2.addCourse('Chemistry');
student2.addGrade('Chemistry', 80);
student2.addGrade('Chemistry', 70);
student2.addAttendance('Chemistry', true);
student2.addAttendance('Chemistry', false);

student3.addCourse('Chemistry');
student3.addGrade('Chemistry', 95);
student3.addGrade('Chemistry', 92);
student3.addAttendance('Chemistry', true);
student3.addAttendance('Chemistry', true);

group.addStudent(student1);
group.addStudent(student2);
group.addStudent(student3);

console.log(group.getAttendanceRanking('Chemistry'));
console.log(group.getGradeRanking('Chemistry'));

group.removeStudent('Alina', 'Ovchynnykova');
console.log(group.students.map(student => `${student.firstName} ${student.lastName}`));

console.log(group.getAllStudentsInfo());

