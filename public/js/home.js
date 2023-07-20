const blogSection = document.querySelector(".blogs-section");

db.collection("blogs")
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      if (blog.id != decodeURI(location.pathname.split("/").pop())) {
        createBlog(blog);
      }
    });
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
           
    </div>
    `;
};
