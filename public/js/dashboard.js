let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector(".login");
const blogSection = document.querySelector(".blogs-section");

auth.onAuthStateChanged((user) => {
  if (user) {
    login.style.display = "none";
  } else {
    setupLoginButon();
  }
});

const setupLoginButon = () => {
  ui.start("#loginUI", {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectURL) {
        login.style.display = "none";
        return false;
      },
    },
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  });
};

// fetch user written blogs

const getUserWrittenBlogs = () => {
  db.collection("blogs")
    .where("author", "==", auth.currentUser.email.split("@")[0])
    .get()
    .then((blogs) => {
      blogs.forEach((blog) => {
        createBlog(blog);
      });
    })
    .catch((error) => {
      console.log("Error getting blogs", error);
    });
};

auth.onAuthStateChanged((user) => {
  if (user) {
    login.style.display = "none";
    getUserWrittenBlogs();
  } else {
    setupLoginButon();
  }
});

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
    <div class="blog-card">

     <div class="blog-box-img">
      <img src="${data.bannerImage}" alt="">
      <a href="/${blog.id}" class="blog-img-link">
      <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
     </div>

     <div class="blog-box-text">
      <a href="/${blog.id}" class="blog-title">${data.title.substring(
    0,
    200
  )}</a>
      <p class="blog-overview">${data.article.substring(0, 200) + "..."}</p>
     </div>

        <a href="/${
          blog.id
        }" class="btn dark"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></a>

        <a href="/${
          blog.id
        }/editor" class="btn grey"><i class="fa-sharp fa-solid fa-pen-to-square"></i></a>

        <a href="#" onclick="deleteBlog('${
          blog.id
        }')" class="btn danger"><i class="fa-sharp fa-solid fa-trash"></i></a>
    </div>
    `;
};

const deleteBlog = (id) => {
  db.collection("blogs")
    .doc(id)
    .delete()
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log("Error deleting the blog", error);
    });
};
