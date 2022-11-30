async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.getElementById('blogTitle').value.trim();
    const body = document.getElementById('blogDescrip').value.trim();

    const newBlogPost = {
      title,
      body,
    };
    
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(newBlogPost),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/userblogs');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.add-blog').addEventListener('submit', newFormHandler);