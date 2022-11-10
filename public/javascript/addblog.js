async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="blog_title"]').value;
    const content = document.querySelector('input[name="blog_body"]').value;
    
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,        
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/userlist');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.add-blog').addEventListener('submit', newFormHandler);