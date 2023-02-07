require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set(`strictQuery`, true);
mongoose
 .connect(`${process.env.MONGO_DB_URL}`)
 .then(() => console.log("Connected to MongoDB..."))
 .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
 name: String,
 author: String,
 tags: [String],
 date: { type: Date, default: Date.now },
 isPublished: Boolean,
});

//class
const Course = mongoose.model("Course", courseSchema);
//----------------------------------------------

// CRUD 1. INSERT INTO
async function createCourse() {
 //object
 const course = new Course({
  name: "Gaga Gaga",
  author: "Gaga",
  tags: ["gaga", "gaga"],
  isPublished: true,
 });

 const result = await course.save();
 console.log(result);
}
// createCourse();
//----------------------------------------------

// CRUD 2. SELECT FROM
const getCourses = async () => {
 const courses = await Course.find();
 console.log(courses);
};
// getCourses();

const filteredSearch = async () => {
 const courses = await Course.find({ name: /^Ang/, isPublished: true });
 // .limit(3)
 // .sort({ name: 2 })
 // .select({ name: 2, tags: 2 });
 console.log(courses);
};
// filteredSearch();

//get filtered data and/or
const getFilteredCourses = async () => {
 const courses = await Course.find().or([
  { author: "Gaga" },
  { isPublished: false },
 ]);
 console.log(courses);
};
// getFilteredCourses();

//----------------------------------------------

// CRUD 3. UPDATE
const updateCourse = async (id) => {
 const course = await Course.findById(id);
 if (!course) return;

 //neleisti pakeisti jau esanciu duomenu
 // if (course.isPublished) return
 // course.isPublished = true;

 course.author = "Lady Gaga";
 const result = await course.save();
 console.log(result);
};
// updateCourse('63e2145976c28dc39bd61d6c');
//----------------------------------------------

// CRUD 4. DELETE
const deleteCourse = async (id) => {
 // const result = await Course.deleteOne({_id: id})
 const result = await Course.findByIdAndRemove(id);
 console.log(result);
};
// deleteCourse('63e2054a73703f2718e2fa97');
