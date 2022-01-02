async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="course-title"]').value;
  const course_url = document.querySelector('input[name="course-url"]').value;

  const response = await fetch(`/api/courses`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      course_url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-course-form').addEventListener('submit', newFormHandler);
