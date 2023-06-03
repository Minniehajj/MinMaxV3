const dotenv = require("dotenv");

async function getAllBlogPosts() {
  // write your code to fetch your data
}

(async function () {
  // initialize environment variables
  dotenv.config();

  try {
    // fetch your data
    const posts = await getAllBlogPosts();

    }
  } catch (error) {
    console.log(error);
  }
})(); 